// Функция для вставки элемента
Element.prototype.appendAfter = function(element) {
    element.parentNode.insertBefore(this, element.nextSibling)
}

function noop() {}

function _createModalFooter(buttons = []) {
    if (buttons.length === 0) {
        return document.createElement('div')
    }

    const wrap = document.createElement('div')
    wrap.classList.add('modal-footer')

    // Создание кнопок
    for(const btn of buttons){
        const $btn = document.createElement('button')
        // Текст
        $btn.textContent = btn.text
        // Bootstrap класс
        $btn.classList.add('btn')
        // Bootstrap стиль
        $btn.classList.add(`btn-${btn.type || 'secondary'}`)
        // Действия при клике
        $btn.onclick = btn.handler || noop

        // Помещение в нужное место
        wrap.appendChild($btn)
    }

    return wrap
}

function _createModal(options) {
    const DEFAULT_WIDTH = '600px'
    // Создание элемента в HTML-документе с указаным тегом
    const modal = document.createElement('div')
    // Добавление класса к созданному элементу
    modal.classList.add('nmodal')
    // Вставляем элемент в нужное место
    modal.insertAdjacentHTML('afterbegin', `
    <!-- Затемнение фона -->
    <div class="modal-overlay" data-close="true">
        <!-- Главный элемент для самого модального окна -->
        <div class="modal-window" style="width: ${options.width || DEFAULT_WIDTH}">
            <!-- Элементы модальног окна -->
            <div class="modal-header">
                <span class="modal-title">${options.title || ''}</span>
                ${options.closable ? `<span class="modal-close" data-close="true">&times;</span>` : ''}
                
            </div>

            <div class="modal-body" data-content>
                ${options.content || ''}
            </div>


        </div>
    </div>
    `)
    const footer = _createModalFooter(options.footerButtons)
    // Вставка footer
    footer.appendAfter(modal.querySelector('[data-content]'))
    // Созданный элемент вставляем в конец document body
    // Без этой строчке, при вызове метода $.modal, модальное окно не отображается
    document.body.appendChild(modal)
    return modal
}
// Объект у которого есть функция modal, которая является функцией
/* Функция будет в себя принимать некий объект options и возвращать объект
 с методами */
// Open - открыть
// Close - закрыть
// Destroy - оптимизация
$.modal = function (options) {
    // Время за которое будет идти анимация
    const ANIMATION_SPEED = 200
    const $modal = _createModal(options)
    // Защита от вызова метода open, когда сработал метода close
    let closing = false

    let destroyed = false

    const modal = {
        open() {
            if (destroyed) {
                // Проверка был ли использован метод destroyed
                return console.log('Modal is destroyed')
            }
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
         }
    }

    // Функцию записали в переменную, чтобы ее легче было использовать (добавлять, удалять)
    const listener = event => {
        if (event.target.dataset.close) {
            modal.close()
        }
    }

    // Закрытие модального окна
    $modal.addEventListener('click', listener)

    return Object.assign(modal, {
        destroy() {
            // Очистка DOM от modal
            $modal.parentNode.removeChild($modal)
            $modal.removeEventListener('click', listener)
            destroyed = true
        },
        
        // Смена контента у модального окна
        setContent(html) {
            $modal.querySelector('[data-content]').innerHTML = html
        }
    })
}