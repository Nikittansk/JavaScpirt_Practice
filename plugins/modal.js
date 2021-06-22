// Объект у которого есть функция modal, которая является функцией
/* Функция будет в себя принимать некий объект options и возвращать объект
 с методами */
// Open - открыть
// Close - закрыть
// Destroy - оптимизация
function _createModal(options) {
    // Создание элемента в HTML-документе с указаным тегом
    const modal = document.createElement('div')
    // Добавление класса к созданному элементу
    modal.classList.add('nmodal')
    // Вставляем элемент в нужное место
    modal.insertAdjacentHTML('afterbegin', `
    <!-- Затемнение фона -->
    <div class="modal-overlay">
        <!-- Главный элемент для самого модального окна -->
        <div class="modal-window">
            <!-- Элементы модальног окна -->
            <div class="modal-header">
                <span class="modal-title">Modal title</span>
                <span class="modal-close">&times;</span>
            </div>

            <div class="modal-body">
                <p>Lorem ipsum dolor sit.</p>
                <p>Lorem ipsum dolor sit.</p>
            </div>

            <div class="modal-footer">
                <button>Ok</button>
                <button>Cancel</button>
            </div>
        </div>
    </div>
    `)
    // Созданный элемент вставляем в конец document body
    // Без этой строчке, при вызове метода $.modal, модальное окно не отображается
    document.body.appendChild(modal)
    return modal
}

$.modal = function (options) {
    // Время за которое будет идти анимация
    const ANIMATION_SPEED = 200
    const $modal = _createModal(options)
    // Защита от вызова метода open, когда сработал метода close
    let closing = false

    return {
        open() {
            // Добавляем класс
            !closing && $modal.classList.add('open')
         },
        close() {
            closing = true
            // Удаляем класс
            $modal.classList.remove('open')
            $modal.classList.add('hide')
            // Удаление класса, после завершения анимации
            setTimeout(() => {
                $modal.classList.remove('hide')
                closing = false
            }, ANIMATION_SPEED)
         },
        destroy() { }
    }
}