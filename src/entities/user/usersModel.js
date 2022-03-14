// HERE WE MAKE API CALLS AND FORMAT DATA BEFORE SENDING IT BACK TO THE CONTROLLER

export async function getUsers() {
  const response = await fetch("/users");
  // 	const data = await response.json();

  let data = {
    id: "1",
    name: "another test",
    age: 20,
    access: "reader",
  };

  return data;
}
