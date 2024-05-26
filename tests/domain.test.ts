import { AnsweredQuestion } from "#imports";
import { describe, expect, test } from "vitest";

describe.todo("Component", () => {
  test.todo("Query components correct component type", () => {});
  test.todo("Query components correct attributes", () => {});
  test.todo("Get components correct component type", () => {});
  test.todo("Get components not empty", () => {});
});
describe.todo("Build", () => {
  test.todo("Generate candidate builds not empty", () => {});
  test.todo("Constraints met", () => {});
  test.todo("Upload comment", () => {});
  test.todo("Increase likes", () => {});
  test.todo("Increase dislikes", () => {});
  test.todo("Save build", () => {});
});
describe.todo("Library", () => {
  test.todo("In library", () => {});
  test.todo("Not in library", () => {});
});
describe.todo("WallOfBuilds", () => {
  test.todo("Show builds show all", () => {});
  test.todo("Post build shown afterwards", () => {});
});
describe.todo("BillingInformation", () => {
  test.todo("Is valid", () => {
    // Check valid
    const billingInformation = new BillingInformation(
      1,
      "Test",
      "Test",
      "Hfaistou 38",
      26224,
      "Patras",
      "Greece"
    );
    expect(billingInformation.isValid()).toBe(true);

    // Check street number
    billingInformation.address = "Hfaistou asdf";
    expect(billingInformation.isValid()).toBe(false);
    billingInformation.address = "Hfaistou 36.8";
    expect(billingInformation.isValid()).toBe(false);
    billingInformation.address = "Hfaistou 38";

    // Check postal code
    billingInformation.postal_code = 123456;
    expect(billingInformation.isValid()).toBe(false);
    billingInformation.postal_code = 123.4;
    expect(billingInformation.isValid()).toBe(false);
    billingInformation.postal_code = 26224;

    // Check city
    billingInformation.city = "Trikala";
    expect(billingInformation.isValid()).toBe(false);
    billingInformation.city = "Patras";

    // Check county
    billingInformation.country = "Albania";
    expect(billingInformation.isValid()).toBe(false);
    billingInformation.country = "Greece";

    expect(billingInformation.isValid()).toBe(true);
  });
});
describe.todo("Purchase", () => {
  test.todo("Place order placed", () => {});
});
describe.todo("Builder", () => {});
describe.todo("UserStatus", () => {
  test.todo("Correct user status for builder", () => {});
  test.todo("Is logged in", () => {});
  test.todo("Is not logged in", () => {});
});
describe.todo("Rating", () => {
  test.todo("Update rating", () => {});
});
describe.todo("Inventory", () => {});
describe.todo("SpellChecker", () => {
  test.todo("Spell check", () => {});
});
describe("AnsweredQuestion", () => {
  test("Change selection in bounds", () => {
    const question = new Question("Q", ["a", "b", "c"]);
    const answeredQuestion = new AnsweredQuestion(question, 2);

    answeredQuestion.changeSelection(1);
    expect(answeredQuestion.selected).toBe(1);
    expect(answeredQuestion.changeSelection(4)).toThrowError();
  });
});
