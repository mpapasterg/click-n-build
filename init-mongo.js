// Add composer user (for tutorials publishing)
print("===== DATABASE INIT =====");

// Create a collection for each database to force creation

// Create Production Database

db = db.getSiblingDB("click-n-build-prod");
db.createCollection("users");

// Create Development Database

db = db.getSiblingDB("click-n-build-dev");
db.createCollection("users");
