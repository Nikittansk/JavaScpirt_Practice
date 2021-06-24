// Для основной разработке
const fruits = [
    {id: 1, title: 'Яблоки', price: 20, img: 'https://image.flaticon.com/icons/png/512/415/415733.png'},
    {id: 2, title: 'Апельсин', price: 30, img: 'https://image.flaticon.com/icons/png/512/1531/1531329.png'},
    {id: 3, title: 'Манго', price: 40, img: 'https://image.flaticon.com/icons/png/512/3480/3480328.png'}
]

// Вызов функции. $ - означает, что это плагин
// Плагин для модального окна
const modal = $.modal({
    title: 'Nikita Modal',
    closable: true,
    content: `
        <p>Lorem ipsum dolor sit.</p>
    `,
    width: '400px',
    // FooterButtons - массив с кнопками
    // Text - название кнопки
    // Type - стиль
    // Handler() - что будет происходить при клике
    footerButtons: [
        {text: 'Ok', type: 'primary', handler() {
            // Вывод в консоль после клика
            console.log('Primary btn clicked')
            // Закрытие окна
            modal.close()
        }},
        {text: 'Cancel', type: 'danger', handler() {
            // Вывод в консоль после клика
            console.log('Danger btn clicked')
            // Закрытие окна
            modal.close()
        }}
    ]
})
