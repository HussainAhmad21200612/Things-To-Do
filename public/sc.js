var data=[];
const add=document.getElementById("add");
const checkbox=document.getElementById("checkbox");

const delbtn=document.getElementById("delete");
add.addEventListener("click",()=>{
  // const val=text.value;
  const text=document.getElementById("name");
  if (text.value){
  const todo={
    text:text.value,
    completed:false
  }
  fetch("/",{
    method:"POST",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify(todo)
  
  }).then((res)=>{
    if (res.status===200){
      //display in UI todo
      createTodo(todo);
    }
    else{
      alert("Error in saving data");
    }
  })
}
  });
  function createTodo(todo){
    if (todo.text){
      console.log("heyy");
      // const tbdy=document.getElementById("tbody");
      const tr=document.createElement("tr");
      const td1=document.createElement("td");
      const input=document.createElement("input");
      input.type="checkbox";
      input.id="packers";
      input.style.marginRight="10px";
      input.addEventListener("change",()=>{
        fetch("/update",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
                },
            body:JSON.stringify({
                property : 'text',
                value : todo.text
            })
        }).then((res)=>{
            if (res.status===200){
                console.log("success");
            }
            else{
                alert('something weird happened');
            }
        });
        });

      const label=document.createElement("label");
      label.htmlFor="packers";
      label.classList="strikethrough";
      if (todo.completed){
        input.checked=true;
      }
      const text=todo.text;
      label.appendChild(document.createTextNode(text));
      td1.appendChild(input);
      td1.appendChild(label);
      td1.style.textAlign="left";
      const td3=document.createElement("td");
      // const btn=document.createElement("button");
      // btn.id="delete";
      // btn.classList="btn";
      // btn.onclick=deleteTodo;
      
      // btn.appendChild(document.createTextNode("X"));
      const lst=document.getElementById("list");
      var removeTask = document.createElement('input');
      removeTask.setAttribute('type', 'button');
      removeTask.setAttribute("value", "X");
      removeTask.setAttribute("id", "delete");
      removeTask.setAttribute("class", "btn btn-outline-success");
      removeTask.setAttribute("style", "font-size: 0.8rem;text-align: center;padding: 0px 0px 0px 0px;");
      removeTask.addEventListener('click', function(e) {
          console.log(tr.childNodes[0].childNodes[1].innerHTML);
          fetch("/delete",{
            method:"POST",
            headers:{
              "Content-Type":"application/json"
            },
            body:JSON.stringify({
            property : 'text',
            value : tr.childNodes[0].childNodes[1].innerHTML})
          }).then((res)=>{
            if (res.status===200){
                console.log("success");
              }
              else{
                alert('something weird happened');
              }
            });
          lst.removeChild(tr);
      }, false);
      td3.appendChild(removeTask);
      // td3.appendChild(btn);
      tr.appendChild(td1);
      tr.appendChild(td3);
  
      document.getElementsByTagName("table")[0].appendChild(tr);
    
      }
  }



fetch("/todo").then((res)=>{
    if (res.status===200){
        return res.json();
    }
    else{
        alert("Error in fetching data");
    }
    }).then((todos)=>{
        todos.forEach((todo)=>{
            createTodo(todo);
        })
    }
    );