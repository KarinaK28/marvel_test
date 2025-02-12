    // действия с элементами //




    // добавляем inline-стили

    const box = document.getElementById('box');
    // получили элемент по айди.
    //обращаемся к нему, потом к его свойству style.
    box.style.backgroundColor = 'blue';
    //далее пишем любое свойство которое хотим поменять или назначить.
    // css- свойство пишется camelcase'ом,  key:value, и value ему мы делаем blue(можно и в формате hex, rgba) в кавычках. 
    //пример:
    box.style.width = '500px';
    // *inline-стили перебивают по иерархии все остальные стили.

    //один пример практики:
    //получаем псевдомассив из всех тэгов на странице:
    const btns = document.getElementsByTagName('button');




                    //если надо к конкретному элементу//

    //обращаемся ко второй кнопке под индексом 1 и делаем ее круглой:
    btns[1].style.borderRadius = '100%';
    btns.style.borderRadius = '100%';// - не сработает т.к. обратились к псевдомассиву а не конкретной кнопке.





                    // меняем стили через ccsTEXT //

    // cssTEXT :
    // берем box
    const box = document.getElementById('box');
    // обращаемся к стилям.
    box.style. // ...
    box.style.cssTEXT = 'background-color: blue; width: 500px;';
    //обращаемся к cssTEXT и передаем стили в строчку.
    // или к одному конкретному.
    btns[3].style.cssTEXT = 'background-color: blue; width: 500px;';






        // если надо над несколькими элементами надо произвести применения.//

    // 1) можно циклом for. непопулярный вариант.
    const divs = document.querySelectorAll('div'); // получаем элементы

    // начинаем с нулевого индекса и до того, пока не будут перебраны все: div.length(имя перебираемого массива.метод перебора до конца).
    for (let i = 0; i < divs.length; i++) {
    divs[i].style.backgroundColor = 'blue';
    } 

    // можно методом forEach, но он работает если элементы получены через .querySelectorAll
    const divs = document.querySelectorAll('div'); // получили элементы

    divs.forEach(item => {
    item.style.backgroundColor = 'blue'; //перебрали их и поменяли бг на синий.
    });




                    // методы //



        // ОПИСАНИЕ МЕТОДА .createElement //
    //.createElement(); 
    // создание элементов через метод .createElement(); 
    // во внутрь метода надо вписать то, что мы сейчас создаем, например div.
    const div = document.createElement('div');
    // элемент создан, НО он пока что существует только внутри джаваскрипта.



        // ОПИСАНИЕ МЕТОДА .createTextNode //
    //.createTextNode(); - *используется редко
    // создает текст, который не помещен ни в какой тэг. то есть, просто текстовую ноду(узел), который существует только в джаваскрипте. в верстке он не появится.
    //принимает в себя просто текст.

    const text = document.createTextNode('Тут был я');




            // ОПИСАНИЕ свойства .classList и его методы//
    //classList.method
    //.classList умеет: удаление, добавление, переключение, проверка на содержание, определение количества примененных классов к элементу....

    //методы к свойству .classList из документации:
    // .add( String [,String] )    //Добавляет элементу указанные классы
    // .remove( String [,String] ) //Удаляет у элемента указанные классы
    // .item ( Number ) //Результат аналогичен вызову сlassList[Number]
    // .toggle ( String [, Boolean]) //Если класс у элемента отсутствует - добавляет, иначе - убирает. Когда вторым параметром передано false - удаляет указанный класс, а если true - добавляет.
    // .contains ( String ) //Проверяет, есть ли данный класс у элемента (вернет true или false)

    //пример: в ccs прописан класс .black с какими-то стилями.Мы берем наш div, который мы создали выше - const div = document.createElement('div'); - который пока что существует ТОЛЬКО в джаваскрипте, и добавляем ему класс.
    div.classList.add('black');
    //класс black добавлен к нашему div, но на странице его попрежнесу нет.




                // ОПИСАНИЕ МЕТОДА .append .prepend//
    //.append и .prepend
    // .append - добавляет элемент на страницу ПОСЛЕ указанного dom-узла
    // .prepend - добавляет элемент на страницу ПЕРЕД указанным dom-узлом.
    // схема: к-кому-обращаемся-глобально.родитель.метод(элемент);
    // схема на примере вышенаписанного кода:
    document.body.prepend(div); //- добавим элемент в самое начало верстки.
        // или
    document.body.apppend(div); //- добавим элемент в самый конец верстки.

    // ещё пример: 
    <div class='wrapper'>
    <div class='test'></div>
    <div class='test'></div>            // пример какого-то блока из верстки
    <div class='test'></div>
    </div>

    //можем получить .wrapper сразу, не передавая его в переменную если мы его больше не будем использовать кроме как сдесь.
    document.querySelector('.wrapper').append(div);

    // результат:
    <div class='wrapper'>
    <div class='test'></div>
    <div class='test'></div>            
    <div class='test'></div>
    <div class='black'></div>        //.append добавил наш div в конец родителя .wrapper
    </div>

    // .prepend соответственно добавил бы div в самое начало.




            // ОПИСАНИЕ МЕТОДА .after .before //
    //.after
    //.before
    // аналог prepend\append. если нужно добавить элемент перед\после какого-то конкретного элемента внутри родителя.
    // пример:
    //есть верстка
    div.wrapper
    div.test    // индекс 0
    div.test    // индекс 1
    div.test    // индекс 2
    div.test    // индекс 3
    /div

    document.querySelector('.test[2]').before(div);
    //полчуаем:
    div.wrapper
    div.test    // индекс 0
    div.test    // индекс 1
    div.test    // индекс 2
    div.black   // наш добавленный div ПОСЛЕ(.before()) 2 индекса.
    div.test    // индекс 3
    /div

    //.after() добавит ПЕРЕД конкретным элементом.





                // ОПИСАНИЕ МЕТОДА .remove //
    //.remove
    //удаление элемента.
    //пример:
    //есть верстка:
    div.wrapper
    div.test    // индекс 0
    div.test    // индекс 1
    div.test    // индекс 2
    div.test    // индекс 3
    /div

    //получаем псевдомассив .test'ов
    const testS = document.querySelectorAll('.test');
    testS[3].remove(); //удаляем элемент с 3им индексом.

    //получаем:
    div.wrapper
    div.test    // индекс 0
    div.test    // индекс 1
    div.test    // индекс 2
    /div




            // ОПИСАНИЕ МЕТОДА .replaceWith //
    //.replaceWith();
    //заменяет одно свойства другим.
    //пример:
    div.wrapper
    div.test    // индекс 0
    div.test    // индекс 1
    div.test    // индекс 2
    div.test    // индекс 3
    /div

    //получаем псевдомассив .test'ов
    const testS = document.querySelectorAll('.test');

    testS[2].replaceWith(div);

    //получаем:
    div.wrapper
    div.test    // индекс 0
    div.test    // индекс 1
    div.black    // индекс 2. замена на наш div
    div.test    // индекс 3
    /div





                // ОПИСАНИЕ МЕТОДА .innerHTML //
    //.innerHTML;
    //
    //пример: 

    div.innerHTML = 'hello World';
    // и в нашем div появится надпись без тегом hello world, НО
    // мы можем вставить и тэги.
    div.innerHTML = '<h1>hello World</h1>'
    //теперь в нашем div есть h1 с hello World, а не просто пустой текст.




                // ОПИСАНИЕ МЕТОДА .textContent //
    //.textContent; 
    // добавляет текст в указанный элемент
    //пример: 

    div.textContent = 'hello World'; // в div добавиться текст Hello world
    // или
    div.textContent = '<h1>hello World</h1>' // // в div добавиться текст <h1>hello World</h1>. тэгом он НЕ станет.

    //например, применимо к ккому-то инпуту.тэги не преобразуются в код в целях безопасности, дабы в инпут не передали какой-то сторонний код с src ведущий на что-то другое.






            // ОПИСАНИЕ МЕТОДА .insertAdjacentHTML //
    //.insertAdjacentHTML(); 
    //вставка кусокчков html кода ПЕРЕД или ПОСЛЕ элемента
    //синтаксис метода: 
    //1) указываем элемент над которым будем производить махинации:
    div.
    //2)ставим точку и прописываем его название:
    div.insertAdjacentHTML('', );
    //3) метод принимает ДВА аргумента.

    //ПЕРВЫЙ АРГУМЕНТ:
    //beforebegin - непосредственно ПЕРЕД(за его пределами, сразу перед ним) элементом.
    //afterend - непосредственно ПОСЛЕ(за его пределами, сразу после него) элементом.
    //afterbegin - вставляет html код ВНУТРЬ этого элемента, и дальше, если там уже есть другие html тэги, то наш становится В САМОЕ НАЧАЛО. (аналог prepend)
    //beforeend - вставляет html код ВНУТРЬ этого элемента, и дальше, если там уже есть другие html тэги, то наш становится В САМЫЙ КОНЕЦ. (аналог append)

    //ВТОРОЙ АРГУМЕНТ - это тот HTML который мы хотим вставить.*в ковычки
    div.insertAdjacentHTML('beforebegin\afterend\afterbegin\beforeend', '<h3>Hello</h3>');








    //======================================================//

    //Альтернативный способ получения доступа к элементу не через DOCUMENT //

    // пример через document:

    div.wrapper
    div.test    // индекс 0
    div.test    // индекс 1
    div.test    // индекс 2
    div.test    // индекс 3
    /div

    const wrapper = document.querySelector('.wrapper'), //получаем wrapper из DOCUMENT.
        test = document.querySelectorAll('.test'); //получили test-ы из DOCUMENT.


    // альтернативный способ обращения к уже полученому элементу:


    const wrapper = document.querySelector('.wrapper'), //получаем wrapper из DOCUMENT.
        test = wrapper.querySelectorAll('.test'); //получили test-ы из уже полученного выше WRAPPER.