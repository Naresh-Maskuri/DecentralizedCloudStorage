import { useState } from "react";
import "./Display.css";

const Display = ({ contract, account }) => {
  const [data, setData] = useState("");

  const getdata = async () => {
    let dataArray;
    const Otheraddress = document.querySelector(".address").value;

    try {
      if (Otheraddress) {
        dataArray = await contract.display(Otheraddress);
        console.log(dataArray);
      } else {
        dataArray = await contract.display(account);
      }
    } catch (e) {
      alert("You don't have access");
      return;
    }

    const isEmpty = !dataArray || dataArray.length === 0;

    if (!isEmpty) {
      const str = dataArray.toString();
      const str_array = str.split(",");

      const images = str_array.map((item, i) => (
        <a href={item} key={i} target="_blank" rel="noopener noreferrer">
          <img
            src={`https://gateway.pinata.cloud/ipfs/${item.substring(6)}`}
            alt="Uploaded"
            className="image-list"
          />
        </a>
      ));
      setData(images);
    } else {
      alert("No image to display");
    }
  };

  return (
    <>
      <div className="image-list">{data}</div>
      <input
        type="text"
        placeholder="Enter Address"
        className="address"
      />
      <button className="center button" onClick={getdata}>
        Get Data
      </button>
    </>
  );
};

export default Display;
