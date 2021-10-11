import axios from "axios";

const Compile = async (program) => {
  console.log(program);
  try {
    const res = await axios.post("https://api.jdoodle.com/v1/execute", program);
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export default Compile;
