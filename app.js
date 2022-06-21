// 取得這個空間讓裡面新增子層
let section = document.querySelector('section');
// 取得表單內的button
let add = document.querySelector('form button');
add.addEventListener('click', (e) => {
    // 避免表單提交出去使網頁重新整理
    e.preventDefault();

    // 取得表單input裡面的內容

    // 取得add觸發事件時的父層
    let form = e.target.parentElement;
    // 取得上列第一個子層(也就是第一個input)裡面輸入的內容
    let todoText = form.children[0].value;
    // 從上以此類推
    let todoMonth = form.children[1].value;
    let todoDate = form.children[2].value;

    // 如果內容為空白就跳出提醒視窗
    if (todoText === '') {
        alert('請輸入內容');
        return; //讓下方程式碼都不執行
    }

    // 創造todo到section裡面

    // 創造一個叫todo的div
    let todo = document.createElement('div');
    // 在todo這個div的css裡面增加一個叫todo的class
    todo.classList.add('todo');

    // 創造一個叫text的p
    let text = document.createElement('p');
    // 在text這個p的css裡面增加一個叫todo-text的class
    text.classList.add('todo-text');
    // 這個p裡面會寫入todeText取得的內容
    text.innerText = todoText;

    // 創造一個叫time的p
    let time = document.createElement('p');
    // 在time這個p的css裡面增加一個叫todo-time的class
    time.classList.add('todo-time');
    // 這個p裡面會寫入todeMonth跟todoDate取得的內容
    time.innerText = todoMonth + '/' + todoDate;

    // 在todo裡面加一個text子層
    todo.appendChild(text);
    // 在todo裡面加一個time子層
    todo.appendChild(time);

    // 創造勾勾跟垃圾桶的icon

    // 創造一個叫completeButton的button
    let completeButton = document.createElement('button');
    // 在completeButton這個button的css裡面增加一個叫complete的class
    completeButton.classList.add('complete');
    // 在completeButton裡面加入勾勾icon
    completeButton.innerHTML = '<i class="fa-solid fa-check"></i>';

    // 點擊勾勾時使completeButton的父層透明,文字畫槓(或相反)
    completeButton.addEventListener('click', (e) => {
        let todoItem = e.target.parentElement;
        // toggle  增加原有class或刪除
        todoItem.classList.toggle('done');
    });

    // 創造垃圾桶icon做法跟上述一樣
    let trashButton = document.createElement('button');
    trashButton.classList.add('trash');
    trashButton.innerHTML = '<i class="fa-solid fa-trash"></i>';

    // 點擊垃圾桶時使trashButton的父層整個消失
    trashButton.addEventListener('click', (e) => {
        let todoItem = e.target.parentElement;
        // 動畫結束觸發事件(animationend)
        todoItem.addEventListener('animationend', () => {
            // 把localStorage的也移除掉
            let text = todoItem.children[0].innerText;
            let myListArray = JSON.parse(localStorage.getItem('list'));
            myListArray.forEach((item, index) => {
                if (item.todoText == text) {
                    myListArray.splice(index, 1);
                    localStorage.setItem('list', JSON.stringify(myListArray));
                }
            });

            // remove可以移除Element
            todoItem.remove();
        });

        // 套上慢慢消失的動畫
        todoItem.style.animation = 'scaleDown 0.3s forwards';
    });

    // 在todo裡面加一個completeButton子層
    todo.appendChild(completeButton);
    // 在todo裡面加一個trashButton子層
    todo.appendChild(trashButton);

    // 讓todo套上transform動畫
    todo.style.animation = 'scaleUp 0.3s forwards';

    // 創造物件
    let myTodo = {
        todoText: todoText,
        todoMonth: todoMonth,
        todoDate: todoDate,
    };

    // 把資料變成物件放進一個陣列裡面
    let myList = localStorage.getItem('list');
    if (myList == null) {
        localStorage.setItem('list', JSON.stringify([myTodo]));
    } else {
        let myListArray = JSON.parse(myList);
        myListArray.push(myTodo);
        localStorage.setItem('list', JSON.stringify(myListArray));
    }

    // 清空該input內容
    form.children[0].value = '';
    // 在section裡面加一個todo子層
    section.appendChild(todo);
});

loadData();

function loadData() {
    let myList = localStorage.getItem('list');
    if (myList !== null) {
        let myListArray = JSON.parse(myList);
        myListArray.forEach((item) => {
            // 創造todo
            let todo = document.createElement('div');
            todo.classList.add('todo');
            let text = document.createElement('p');
            text.classList.add('todo-text');
            text.innerText = item.todoText;
            let time = document.createElement('p');
            time.classList.add('todo-time');
            time.innerText = item.todoMonth + '/' + item.todoDate;
            todo.appendChild(text);
            todo.appendChild(time);

            // 創造一個叫completeButton的button
            let completeButton = document.createElement('button');
            // 在completeButton這個button的css裡面增加一個叫complete的class
            completeButton.classList.add('complete');
            // 在completeButton裡面加入勾勾icon
            completeButton.innerHTML = '<i class="fa-solid fa-check"></i>';

            // 點擊勾勾時使completeButton的父層透明,文字畫槓(或相反)
            completeButton.addEventListener('click', (e) => {
                let todoItem = e.target.parentElement;
                // toggle  增加原有class或刪除
                todoItem.classList.toggle('done');
            });

            // 創造垃圾桶icon做法跟上述一樣
            let trashButton = document.createElement('button');
            trashButton.classList.add('trash');
            trashButton.innerHTML = '<i class="fa-solid fa-trash"></i>';

            // 點擊垃圾桶時使trashButton的父層整個消失
            trashButton.addEventListener('click', (e) => {
                let todoItem = e.target.parentElement;
                // 動畫結束觸發事件(animationend)
                todoItem.addEventListener('animationend', () => {
                    // 把localStorage的也移除掉
                    let text = todoItem.children[0].innerText;
                    let myListArray = JSON.parse(localStorage.getItem('list'));
                    myListArray.forEach((item, index) => {
                        if (item.todoText == text) {
                            myListArray.splice(index, 1);
                            localStorage.setItem(
                                'list',
                                JSON.stringify(myListArray)
                            );
                        }
                    });
                    // remove可以移除Element
                    todoItem.remove();
                });

                // 套上慢慢消失的動畫
                todoItem.style.animation = 'scaleDown 0.3s forwards';
            });

            todo.appendChild(completeButton);
            todo.appendChild(trashButton);

            section.appendChild(todo);
        });
    }
}

// 演算法
function mergeTime(arr1, arr2) {
    let result = [];
    let i = 0;
    let j = 0;

    while (i < arr1.length && j < arr2.length) {
        if (Number(arr1[i].todoMonth) > Number(arr2[j].todoMonth)) {
            result.push(arr2[j]);
            j++;
        } else if (Number(arr1[i].todoMonth) < Number(arr2[j].todoMonth)) {
            result.push(arr1[i]);
            i++;
        } else if (Number(arr1[i].todoMonth) == Number(arr2[j].todoMonth)) {
            if (Number(arr1[i].todoDate) > Number(arr2[j].todoDate)) {
                result.push(arr2[j]);
                j++;
            } else {
                result.push(arr1[i]);
                i++;
            }
        }
    }

    while (i < arr1.length) {
        result.push(arr1[i]);
        i++;
    }
    while (j < arr2.length) {
        result.push(arr2[j]);
        j++;
    }

    return result;
}

function mergeSort(arr) {
    if (arr.length === 1) {
        return arr;
    } else {
        let middle = Math.floor(arr.length / 2);
        let right = arr.slice(0, middle);
        let left = arr.slice(middle, arr.length);
        return mergeTime(mergeSort(right), mergeSort(left));
    }
}

let sortButton = document.querySelector('div.sort button');
sortButton.addEventListener('click', () => {
    // sort data
    let sortedArray = mergeSort(JSON.parse(localStorage.getItem('list')));
    localStorage.setItem('list', JSON.stringify(sortedArray));

    // remove data
    let len = section.children.length;
    for (let i = 0; i < len; i++) {
        section.children[0].remove();
    }

    // load data
    loadData();
});
