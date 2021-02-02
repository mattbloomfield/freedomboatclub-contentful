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

FBC.locations = {
    init: () => {
        const videos = document.querySelectorAll('.boat');
        videos.forEach(video=> {
            console.log('video', video);
            video.addEventListener('click', (ev) => {
                ev.preventDefault();
                let bodyHtml = `
                    <div class="pb-aspect-ratio relative mt-2 mb-4 overflow-hidden rounded max-w-full w-full" >
                `;
                if (video.dataset.ytid) {
                    bodyHtml = `
                        <iframe class="absolute inset-0 w-full h-full" src="https://www.youtube.com/embed/${video.dataset.ytid}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen=""></iframe>
                    `
                } else {
                    bodyHtml += `
                        <img src="${video.dataset.coverImage}" class="absolute inset-0 w-full h-full" alt="A picture of a ${video.dataset.name}"/>
                    `
                }
                bodyHtml +=`   
                    </div>
                    <div class="grid grid-cols-3 gap-4 my-4 justify-items-center">
                        <div class="flex flex-col justify-center">
                            <span class="mb-2">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" class="fill-current text-gray-500 mx-auto"><path d="M16.05 12.05L21 17l-4.95 4.95-1.414-1.414 2.536-2.537L4 18v-2h13.172l-2.536-2.536 1.414-1.414zm-8.1-10l1.414 1.414L6.828 6 20 6v2H6.828l2.536 2.536L7.95 11.95 3 7l4.95-4.95z"/></svg>
                            </span>
                            <span>${video.dataset.meta1}</span>
                        </div>
                        <div class="flex flex-col justify-center">
                            <span class="mb-2"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" class="fill-current text-gray-500 mx-auto"><path d="M12 11a5 5 0 0 1 5 5v6h-2v-6a3 3 0 0 0-2.824-2.995L12 13a3 3 0 0 0-2.995 2.824L9 16v6H7v-6a5 5 0 0 1 5-5zm-6.5 3c.279 0 .55.033.81.094a5.947 5.947 0 0 0-.301 1.575L6 16v.086a1.492 1.492 0 0 0-.356-.08L5.5 16a1.5 1.5 0 0 0-1.493 1.356L4 17.5V22H2v-4.5A3.5 3.5 0 0 1 5.5 14zm13 0a3.5 3.5 0 0 1 3.5 3.5V22h-2v-4.5a1.5 1.5 0 0 0-1.356-1.493L18.5 16c-.175 0-.343.03-.5.085V16c0-.666-.108-1.306-.309-1.904.259-.063.53-.096.809-.096zm-13-6a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zm13 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zm-13 2a.5.5 0 1 0 0 1 .5.5 0 0 0 0-1zm13 0a.5.5 0 1 0 0 1 .5.5 0 0 0 0-1zM12 2a4 4 0 1 1 0 8 4 4 0 0 1 0-8zm0 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z"/></svg></span>
                            <span>${video.dataset.meta2}</span>
                        </div>
                        <div class="flex flex-col justify-center">
                            <span class="mb-2">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" class="fill-current text-gray-500 mx-auto"><path d="M8.498 20h7.004A6.523 6.523 0 0 1 12 23.502 6.523 6.523 0 0 1 8.498 20zM18 14.805l2 2.268V19H4v-1.927l2-2.268V9c0-3.483 2.504-6.447 6-7.545C15.496 2.553 18 5.517 18 9v5.805zM12 11a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"/></svg>
                            </span>
                            <span>${video.dataset.meta3}</span>
                        </div>
                    </div>
                    <div class="prose dark:prose-dark mt-4">
                        ${atob(video.dataset.description)}
                    </div>
                `
                FBC.modal.create('boat', {
                    header: video.dataset.name,
                    subheader: `${video.dataset.count} at this location`,
                    body: bodyHtml,
                    buttons: [{
                        text: 'Instant Tour',
                        location: '/'
                    }],
                },
                {
                    size: 'lg'
                })
            });
        });
    },
};