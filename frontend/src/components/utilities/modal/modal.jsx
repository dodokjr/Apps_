import React, { useEffect, useState } from "react";
import axios from"axios"

export const ModalSearch = () => {
  const [input, setInput] = useState('')
  const [setData , _setData] = useState([])

  const fecthData = async (e) => {
    try {
      const _r = await axios.get(`http://localhost:3100/users/s?name=${input}`)
      _setData(_r.data.msg)
      setInput('')
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    localStorage.setItem('search', JSON.stringify(setData));
  }, [setData]);
    return(
        <dialog id="searchBox" className="modal">
  <div className="modal-box">
    <h3 className="font-bold text-lg">Search Box</h3>
    <div className="p-3">
    <label className="input input-bordered flex items-center gap-2">
    <input type="text" className="grow" placeholder="Search" value={input} onChange={(e) => setInput(e.target.value)} />
    <button onClick={fecthData}>Search</button>
    </label>
    </div>
    <div className="">
      <span></span>
    </div>
    <div className="modal-action">
      <form method="dialog">
        {/* if there is a button in form, it will close the modal */}
        <button className="btn">Close</button>
      </form>
    </div>
  </div>
</dialog>
    )
}