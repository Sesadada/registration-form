import { useState } from "react";

function App() {
  const [data, setData] = useState({
    name: "",
    email: "",
    number: "",
    country: "",
    password: "",
    password2: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const passwordPattern =
    /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/;
  const emailPattern = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const fetching = () => {
    const formData = {
      name: data.name,
      email: data.email,
      number: data.number,
      country: data.country,
      password: data.password,
    };

    fetch("formData/", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        //if everything ok maybe make another div appear link to another page, auth logic etc
      })
      .catch((error) => {
        setErrorMessage("Something happened");
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.values(data).some((value) => value === "")) {
      setErrorMessage("Please fill in all fields.");
    } else if (data.password !== data.password2) {
      setErrorMessage("Passwords must match.");
    } else if (!passwordPattern.test(data.password)) {
      setErrorMessage(
        "Password requirements: 8-20 characters, 1 number, 1 letter, 1 symbol."
      );
    } else if (!emailPattern.test(data.email)) {
      setErrorMessage("Invalid email address.");
    } else {
      setErrorMessage(null);
      fetching();
      alert(
        `DATA SENT! Name: ${data.name}, Email: ${data.email}, Message: ${data.number}`
      );
    }
  };

  return (
    <div className="flex w-full h-full bg-pink-200 justify-center items-center flex-col">
      <h1 className="font-bold md:text5xl text-3xl pt-4">REGISTER NOW!</h1>

      <div className="md:w-2/4 sm:w-3/4 flex-1 flex-col sm:mt-1 my-8 bg-pink-100 rounded-lg shadow-lg ">
        <form onSubmit={handleSubmit} className="flex flex-col p-10">
          <div></div>
          <label className="text-sm text-pink-500">Name</label>
          <input
            className="bg-white p-2 rounded-lg my-2"
            placeholder="Your name"
            type="text"
            id="name"
            name="name"
            value={data.name}
            onChange={handleChange}
          />

          <label className="text-sm text-pink-500">Email</label>
          <input
            className="bg-white p-2 rounded-lg my-2"
            placeholder="Your email"
            type="email"
            id="email"
            name="email"
            value={data.email}
            onChange={handleChange}
          />

          <label className="text-sm text-pink-500">Phone</label>
          <input
            className="bg-white p-2 rounded-lg my-2"
            placeholder="Your mobile number"
            type="tel"
            id="number"
            name="number"
            value={data.number}
            onChange={handleChange}
          />

          <label className="text-sm text-pink-500">Country</label>
          <input
            className="bg-white p-2 rounded-lg my-2"
            placeholder="Where do you live?"
            type="text"
            id="country"
            name="country"
            value={data.country}
            onChange={handleChange}
          />

          <label className="text-sm text-pink-500">Password:</label>
          <input
            className={` bg-white p-2 rounded-lg my-2 border-2 ${
              errorMessage &&
              (data.password === "" || data.password !== data.password2)
                ? "border-red-500"
                : "border-gray-500"
            }`}
            placeholder="Password should be 8-20 characters, 1 number, 1 letter, 1 symbol"
            type="password"
            id="password"
            name="password"
            value={data.password}
            onChange={handleChange}
          />

          <label className="text-sm text-pink-500">Repeat Password:</label>
          <input
            className={` bg-white p-2 rounded-lg my-2 border-2 ${
              errorMessage &&
              (data.password2 === "" || data.password !== data.password2)
                ? "border-red-500"
                : "border-gray-500"
            }`}
            placeholder="Repeat your password"
            type="password"
            id="password2"
            name="password2"
            value={data.password2}
            onChange={handleChange}
          />

          <button className="bg-pink-300 text-white rounded-lg shadow-xl p-2 mt-4 hover:bg-pink-600">
            send
          </button>
        </form>
      </div>
      {errorMessage && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white border-2 border-pink-400 md:w-2/4 w-3/4 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col justify-center place-items-center p-6 md:p-16 rounded-lg shadow-2xl ease-in-out duration-300">
            {errorMessage}
            <button
              onClick={() => setErrorMessage(null)}
              className="bg-pink-300 text-white rounded-lg shadow-xl mt-4 hover:bg-pink-600 md:w-2/4 w-3/4"
            >
              ok
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
