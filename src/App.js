import { useState } from "react";
import "./styles.css";
import json from "./data.json";

export default function App() {
  const [data, setData] = useState(json);
  const [isExpanded, setIsExpanded] = useState({});

  // Use Recursion here
  const List = ({ list, addNodeToList, deleteNodeFromList }) => {
    return (
      <div className="container">
        {list.map((node) => (
          <div key={node.id}>
            {node?.isFolder && (
              <span
                className="node"
                onClick={() =>
                  setIsExpanded((prev) => ({
                    ...prev,
                    [node.name]: !prev[node.name],
                  }))
                }
              >
                {isExpanded?.[node.name] ? "-" : "+"}
              </span>
            )}
            <span>{node.name}</span>
            {node?.isFolder && (
              <span onClick={() => addNodeToList(node.id)}>
                {/* // <span> */}
                <img
                  className="image"
                  src="https://static-00.iconduck.com/assets.00/add-folder-icon-512x436-rr00rjz3.png"
                  alt="addFolder"
                />
              </span>
            )}
            <span onClick={() => deleteNodeFromList(node.id)}>
              <img
                className="image"
                src="https://cdn-icons-png.flaticon.com/512/3161/3161358.png"
                alt="delete"
              />
            </span>
            {node?.children && isExpanded?.[node.name] && (
              <List
                list={node.children}
                addNodeToList={addNodeToList}
                deleteNodeFromList={deleteNodeFromList}
              />
            )}
          </div>
        ))}
      </div>
    );
  };

  // DFS search
  const addNodeToList = (parentId) => {
    const name = prompt("Please enter name");

    const updateTree = (list) => {
      return list.map((node) => {
        if (node.id === parentId) {
          return {
            ...node,
            children: [
              ...node.children,
              {
                id: "123",
                name: name,
                isFolder: true,
                children: [],
              },
            ],
          };
        }
        if (node.children) {
          return { ...node, children: updateTree(node.children) };
        }
        return node;
      });
    };

    setData((prev) => updateTree(prev));
  };

  const deleteNodeFromList = (itemId) => {
    const updateTree = (list) => {
      return list
        .filter((node) => node.id !== itemId)
        .map((node) => {
          if (node.children) {
            return { ...node, children: updateTree(node.children) };
          }
          return node;
        });
    };
    setData((prev) => updateTree(prev));
  };

  return (
    <div className="App">
      <h1>File Folder structure</h1>
      <List
        list={data}
        addNodeToList={addNodeToList}
        deleteNodeFromList={deleteNodeFromList}
      />
    </div>
  );
}
