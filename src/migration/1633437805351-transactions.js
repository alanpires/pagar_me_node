const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class transactions1633437805351 {
    name = 'transactions1633437805351'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "payable" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "status" varchar NOT NULL, "payment_date" datetime NOT NULL, "amount_client" integer NOT NULL, "transactionId" integer, "feeId" integer, "userId" integer, CONSTRAINT "REL_23f2871fd3bc103c0dbc5bb921" UNIQUE ("transactionId"))`);
        await queryRunner.query(`CREATE TABLE "transaction" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "amount" integer NOT NULL, "description" varchar NOT NULL, "payment_method" varchar NOT NULL, "card_number" varchar NOT NULL, "cardholders_name" varchar NOT NULL, "card_expiring_date" datetime NOT NULL, "cvv" varchar NOT NULL, "date_transaction" datetime NOT NULL, "client_id" integer NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "username" varchar NOT NULL, "email" varchar NOT NULL, "first_name" varchar NOT NULL, "last_name" varchar NOT NULL, "password" varchar NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "fee" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "creditFee" integer NOT NULL, "debitFee" integer NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "temporary_payable" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "status" varchar NOT NULL, "payment_date" datetime NOT NULL, "amount_client" integer NOT NULL, "transactionId" integer, "feeId" integer, "userId" integer, CONSTRAINT "REL_23f2871fd3bc103c0dbc5bb921" UNIQUE ("transactionId"), CONSTRAINT "FK_23f2871fd3bc103c0dbc5bb921c" FOREIGN KEY ("transactionId") REFERENCES "transaction" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_e6a41d384e93d9656f13e69c8ac" FOREIGN KEY ("feeId") REFERENCES "fee" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_14942c23f06295318e8ca6bcbb8" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_payable"("id", "status", "payment_date", "amount_client", "transactionId", "feeId", "userId") SELECT "id", "status", "payment_date", "amount_client", "transactionId", "feeId", "userId" FROM "payable"`);
        await queryRunner.query(`DROP TABLE "payable"`);
        await queryRunner.query(`ALTER TABLE "temporary_payable" RENAME TO "payable"`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "payable" RENAME TO "temporary_payable"`);
        await queryRunner.query(`CREATE TABLE "payable" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "status" varchar NOT NULL, "payment_date" datetime NOT NULL, "amount_client" integer NOT NULL, "transactionId" integer, "feeId" integer, "userId" integer, CONSTRAINT "REL_23f2871fd3bc103c0dbc5bb921" UNIQUE ("transactionId"))`);
        await queryRunner.query(`INSERT INTO "payable"("id", "status", "payment_date", "amount_client", "transactionId", "feeId", "userId") SELECT "id", "status", "payment_date", "amount_client", "transactionId", "feeId", "userId" FROM "temporary_payable"`);
        await queryRunner.query(`DROP TABLE "temporary_payable"`);
        await queryRunner.query(`DROP TABLE "fee"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "transaction"`);
        await queryRunner.query(`DROP TABLE "payable"`);
    }
}
