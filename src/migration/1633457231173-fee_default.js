const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class feeDefault1633457231173 {

    async up(queryRunner) {
        await queryRunner.query(`INSERT INTO fee (creditFee, debitFee) VALUES (5, 3)`);
    }

    async down(queryRunner) {
    }
}