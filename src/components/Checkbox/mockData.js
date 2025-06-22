export const checkboxMockData = {
  id: 1,
  labelText: "P1",
  isChecked: false,
  children: [
    {
      id: 2,
      labelText: "P2 C1",
      isChecked: false,
      children: [
        {
          id: 5,
          labelText: "P3 C1",
          isChecked: false,
          children: [
            { id: 9, labelText: "P4 C1", isChecked: false, children: [] },
            { id: 10, labelText: "P4 C2", isChecked: false, children: [] },
          ],
        },
        { id: 6, labelText: "P3 C2", isChecked: false, children: [] },
        { id: 7, labelText: "P3 C3", isChecked: false, children: [] },
        { id: 8, labelText: "P3 C4", isChecked: false, children: [] },
      ],
    },
    { id: 3, labelText: "P2 C2", isChecked: false, children: [] },
    { id: 4, labelText: "P2 C3", isChecked: false, children: [] },
  ],
};
