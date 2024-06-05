export default defineEventHandler(async (event) => {
  // Get answers data
  const answersParseResult = await readValidatedBody(
    event,
    BuildGenerateGetRequestSchema.safeParse
  );
  if (!answersParseResult.success) {
    throw createError({
      statusCode: sanitizeStatusCode(400),
      statusMessage: sanitizeStatusMessage("Bad Request"),
      data: {
        message: "Invalid answers data",
      },
    });
  }
  const answersData = answersParseResult.data.answers;

  // Get questions for each answer
  const questions: Array<InterfaceType<typeof Question>> = [];
  for (const answer of answersData) {
    let question = (await QuestionModel.findOne({
      question: answer.question,
    }).exec())!;
    questions.push(question);
  }
  const answers: Array<InstanceType<typeof AnsweredQuestion>> = answersData.map(
    (answer, index) => new AnsweredQuestion(questions[index], answer.selected)
  );

  // Generate build using answers
  const candidateBuilds: Array<InterfaceType<typeof Build>> = [];
  for (const build of Build.generateCandidateBuilds(answers)) {
    candidateBuilds.push({
      id: build.name,
      name: build.name,
      cpu: build.cpu,
      gpu: build.gpu,
      ram: build.ram,
      drive: build.drive,
      cooling_system: build.cooling_system,
      decoration: build.decoration,
      motherboard: build.motherboard,
      psu: build.psu,
      pc_case: build.pc_case,
    });
  }

  return Response.json({ builds: candidateBuilds });
});
