$.confirm = function(options) {
    return new Promise((resolve, reject) => {
        const modal = $.modal({
            title: options.title,
            width: '400px',
            closable: false,
            content: options.content,
            onClose() {
              modal.destroy()  
            },
            footerButtons: [
                {text: 'Отмена', type: 'secondary', handler() {
                    // Закрытие окна
                    modal.close()
                    reject()
                }},
                {text: 'Удалить', type: 'danger', handler() {
                    // Закрытие окна
                    modal.close()
                    resolve()
                }},
            ]
        })
        setTimeout(() => modal.open(), 100)
    })
}