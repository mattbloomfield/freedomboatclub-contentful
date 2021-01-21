var FBC = FBC || {};

FBC.svg = {
    get: (name, classes) => {
        return FBC.svg[name].replace('CUSTOM_CLASSES', classes);
    },
    close: `<svg class="CUSTOM_CLASSES fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z"/></svg>`,
}

FBC.modal = {
    /**
     * 
     * @param {string} id the element ID for this modal
     * @param {object} components 
     * @param {object} options 
     */
    create: (id='MODAL_1', components={}, options={}) => {
        console.log('in modal creation function');
        document.querySelector('body').classList.add('modal-active')
        FBC.modal.lastCreatedId = id;
        const modal = document.createElement('div');
        modal.id = id;
        modal.classList.add('modal', 'z-40', 'fixed', 'inset-0', 'flex', 'items-center', 'justify-center');
        let buttons = ``;
        if (components.buttons) components.buttons.forEach(button => {
            buttons += `<a class="btn btn-blue" href="${button.location}">${button.text}</a>`
        });
        modal.innerHTML = `
            <div id="Overlay" class="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"></div>
            <div class="modal-container relative w-11/12 max-w-full md:max-w-2xl mx-auto rounded shadow-lg z-50 max-h-screen overflow-y-scroll">
                <div class="modal-inner-container">
                    <div id="ModalHeader" class="p-2 pt-8">
                        <h2 class="text-3xl text-center font-bold font-headline text-white mb-2">${components.header || ''}</h2>
                        <h3 class="text-xl text-center uppercase font-headline text-white">${components.subheader || ''}</h3>
                        <button id="ModalCloseButton" class="absolute top-0 right-0 cursor-pointer flex flex-col items-center mt-4 mr-4 text-blue-fbc text-sm z-50">${FBC.svg.get('close', 'text-gray-200')}<span class="text-sm">(Esc)</span></button>
                    </div>
                    <div id="ModalBody" class="py-4 px-8 text-center">${components.body || ''}</div>
                    <div id="ModalButtons" class="flex justify-center py-4">${buttons || ''}</div>
                </div>
            </div>
        `;
        document.getElementsByTagName('body')[0].prepend(modal);
        
        // handle modal closing
        document.getElementById('ModalCloseButton').addEventListener('click', ev=> {
            FBC.modal.close(id);
        });
        document.getElementById('Overlay').addEventListener('click', FBC.modal.close);
        document.onkeydown = function(evt) {
            evt = evt || window.event
            var isEscape = false
            if ("key" in evt) {
              isEscape = (evt.key === "Escape" || evt.key === "Esc")
            } else {
              isEscape = (evt.keyCode === 27)
            }
            if (isEscape && document.body.classList.contains('modal-active')) {
              FBC.modal.close(id)
            }
        };
    },
    close: (id) => {
        console.log('closing', id);
        if (!id) id = FBC.modal.lastCreatedId;
        document.querySelector('body').classList.remove('modal-active')
        const modalWindow = document.getElementById(id);
        modalWindow.remove();
    }
}
