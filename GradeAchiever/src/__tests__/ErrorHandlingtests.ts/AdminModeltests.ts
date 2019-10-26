import { AdminModel } from "../../models/AdminModel";

test("Throws: Invalid admin credentials", () => {
  const model = new AdminModel();
  let works = 0;
  try {
    model.RemoveUser(1);
  } catch (error) {
    works = 1;
  }
  expect(works === 1);
});
test("The issue with return await", () => {
  const model = new AdminModel();
  let works = 0;
  if(model.GetAllUsers()===[]) {
    works = 1;
  
  }
  expect(works === 1);
});
