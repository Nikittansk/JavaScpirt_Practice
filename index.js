// Для основной разработке
// Вызов функции. $ - означает, что это плагин
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
            console.log('Primary btn clicked')
        }},
        {text: 'Cancel', type: 'danger', handler() {
            console.log('Danger btn clicked')
        }}
    ]
})
