import React, { useState } from "react";

// notes
// reset = 1 will reset textBoxValue to empty after each submission, reset = 0 will not
const EditText = ({ msg, onSubmitFn, reset }) => {
  const [textBoxValue, setTextBoxValue] = useState(msg);

  return (
    <form
      className="flex h-1/6 w-full bg-white"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmitFn(textBoxValue);
        if (reset) {
          setTextBoxValue("");
        }
      }}
    >
      <textarea
        className="resize-none w-10/12 h-5/6 my-auto mx-auto bg-gray-200 py-6
      px-3 rounded-xl"
        placeholder="type message here"
        type="submit"
        value={textBoxValue}
        onChange={(e) => setTextBoxValue(e.target.value)}
      />
      <button
        type="submit"
        className="h-4/5 w-1/12 my-auto mx-auto rounded bg-blue-600 hover:bg-blue-700"
      ></button>
    </form>
  );
};

export default EditText;
