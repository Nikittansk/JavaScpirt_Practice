// Для основной разработке
let fruits = [
    {id: 1, title: 'Яблоки', price: 20, img: 'https://i.pinimg.com/564x/5f/6e/17/5f6e1722b7e7af738ede6d9db20926af.jpg'},
    {id: 2, title: 'Апельсины', price: 30, img: 'https://i.pinimg.com/564x/1e/2a/95/1e2a95fcf764481b6bb5253c55c6f8a6.jpg'},
    {id: 3, title: 'Вишни', price: 40, img: 'https://i.pinimg.com/564x/86/2e/65/862e654a2bc9788e0436ba7f84dedb68.jpg'}
]

// Обработка разметки
// toHTML - это метод, который берет объект fruit и преобразовывает в карточку
const toHTML = fruit => `
    <div class="col">
        <div class="card">
            <img style="height: 390px;" src="${fruit.img}" class="card-img-top" alt="${fruit.title}">
            <div class="card-body">
                <h5 class="card-title">${fruit.title}</h5>
                <a href="#" class="btn btn-primary" data-btn="price" data-id="${fruit.id}">Посмотреть цену</a>
                <a href="#" class="btn btn-danger" data-btn="remove" data-id="${fruit.id}">Удалить</a>
            </div>
        </div>
    </div>
`

// Динамический вывод списка карточек на основе массива
function render() {
    // Получаем массив строк и соединяем его
    const html = fruits.map(toHTML).join('')
    document.querySelector('#fruits').innerHTML = html
}
// Вызов метода для показа карточек
render()

// Вызов функции. $ - означает, что это плагин
// Плагин для модального окна
const priceModal = $.modal({
    title: 'Цена на Товар',
    closable: true,
    width: '400px',
    // FooterButtons - массив с кнопками
    // Text - название кнопки
    // Type - стиль
    // Handler() - что будет происходить при клике
    footerButtons: [
        {text: 'Закрыть', type: 'primary', handler() {
            // Закрытие окна
            priceModal.close()
        }}
    ]
})



document.addEventListener('click', event => {
    event.preventDefault() // Отменить дефолтное значение
    const btnType = event.target.dataset.btn
    const id = +event.target.dataset.id
    const fruit = fruits.find(f => f.id === id)
    if (btnType === 'price') {
        priceModal.setContent(`
            <p>Цена на ${fruit.title}: <strong>${fruit.price}$</strong></p>
        `)
        priceModal.open()
    } else if (btnType === 'remove') {
        $.confirm({
            title: `Вы уверены?`,
            content: `<p>Вы удаляете фрукт: <strong>${fruit.title}</strong></p>`
        }).then(() => { //Попадаем в этот метод, если нажали удалить
            fruits = fruits.filter(f => f.id !== id)
            render()
        }).catch(() => { //Попадаем в этот метод, если нажали отмена
            console.log('Cancel')
        })
    }
})