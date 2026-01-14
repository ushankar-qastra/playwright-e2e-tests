export default class TestData {
  static makeAppointmentTestData() {
    return [
      {
        testId: "TC001",
        facility: "Tokyo CURA Healthcare Center",
        hcp: "Medicare",
        visitDt: "01/11/2026",
      },
      {
        testId: "TC002",
        facility: "Hongkong CURA Healthcare Center",
        hcp: "Medicaid",
        visitDt: "01/12/2026",
      },
      {
        testId: "TC003",
        facility: "Seoul CURA Healthcare Center",
        hcp: "None",
        visitDt: "01/13/2026",
      },
    ];
  }

  static apiUserCreation() {
    return [
      {
        name: "Alex",
        job: "Thomas",
        id: "126",
        createdAt: "2025-10-06T01:35:49.877Z",
      },
    ];
  }
}
