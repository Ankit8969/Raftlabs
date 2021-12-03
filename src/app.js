import React, { useState, useEffect } from "react";
import "./index.css";

const App = () => {
  const [final, setFinal] = useState("");
  const [list, setList] = useState([]);
  const [first, setFirst] = useState("");
  const [second, setSecond] = useState("");
  const [mat, setMat] = useState([]);
  const [vis, setVis] = useState([]);

  const [names, setNames] = useState([]);
  const [friend1, setFriend1] = useState("");
  const [friend2, setFriend2] = useState("");

  useEffect(() => {
    for (var i = 0; i < 10; i++) vis[i] = 0;

    for (var i = 0; i <= 10; i++) {
      mat[i] = new Array();
    }
  }, []);

  const addNodes = (first, second) => {
    let ind1, ind2;
    for (var i = 0; i < names.length; i++) {
      if (names[i].name === first) ind1 = names[i].num;
      if (names[i].name === second) ind2 = names[i].num;
    }
    mat[ind1].push(ind2);
    mat[ind2].push(ind1);
  };

  function dfs(x, y, stk) {
    stk.push(x);
    if (x === y) {
      var ans = "";
      for (let i = 0; i < stk.length; i++) {
        for (let j = 0; j < names.length; j++) {
          if (names[j].num === stk[i]) {
            ans += names[j].name;
            ans += " - ";
          }
        }
      }
      setFinal(ans);
    }

    vis[x] = 1;

    for (var i = 0; i < mat[x].length; i++) {
      if (vis[mat[x][i]] === 1) continue;
      dfs(mat[x][i], y, stk);
    }
    stk.pop();
  }

  function findPath(first, second) {
    let ind1, ind2;
    for (var i = 0; i < names.length; i++) {
      if (names[i].name === first) ind1 = names[i].num;
      if (names[i].name === second) ind2 = names[i].num;
    }

    const stk = [];
    dfs(ind1, ind2, stk);

    if (vis[ind1] === 1 && vis[ind2] === 1) {
      console.log("Path is There");
    } else console.log("No Path ");
  }

  const handleSubmitFriend = () => {
    for (var i = 0; i < 10; i++) vis[i] = 0;
    findPath(friend1, friend2);
  };

  const handleSubmit = () => {
    const obj = {
      name1: first,
      name2: second,
      rel: "friend",
    };
    list.push(obj);

    // Convert name into number
    var flag = 0;
    for (let i = 0; i < names.length; i++) {
      if (names[i].name === first) flag = 1;
    }
    if (flag === 0) names.push({ name: first, num: names.length });
    flag = 0;
    for (let i = 0; i < names.length; i++) {
      if (names[i].name === second) flag = 1;
    }
    if (flag === 0) names.push({ name: second, num: names.length });

    // add the nodes
    addNodes(first, second);

    setFirst("");
    setSecond("");
  };

  return (
    <div className="container">
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="box">
          <input
            type="text"
            value={first}
            onChange={(e) => setFirst(e.target.value.toLowerCase())}
          />
          <span>FRIEND</span>
          <input
            type="text"
            value={second}
            onChange={(e) => setSecond(e.target.value.toLowerCase())}
          />
        </div>

        <button type="submit" onClick={handleSubmit}>
          Add
        </button>
      </form>

      <table className="friendList">
        <tr>
          <th>First Friend</th>
          <th>Relation</th>
          <th>Second Friend</th>
        </tr>
        {list.map((item) => (
          <tr className="relation" key={item.name}>
            <td className="name">{item.name1}</td>
            <td className="rel">{item.rel}</td>
            <td className="name">{item.name2}</td>
          </tr>
        ))}
      </table>

      <div className="friendDetails" style={{ marginTop: "100px" }}>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="box">
            <input
              type="text"
              value={friend1}
              onChange={(e) => setFriend1(e.target.value.toLowerCase())}
            />
            <span>FRIEND</span>
            <input
              type="text"
              value={friend2}
              onChange={(e) => setFriend2(e.target.value.toLowerCase())}
            />
          </div>

          <button type="submit" onClick={handleSubmitFriend}>
            Check
          </button>
          <h2>{final}</h2>
        </form>
      </div>
    </div>
  );
};

export default App;
