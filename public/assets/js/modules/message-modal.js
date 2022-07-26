class MessageModal {

    open(title = 'Alert', messages = [], callback = null){
        this.title = title;
        this.messages = messages;
        this.callback = callback;

        element('messageModalTitle').appendChild(document.createTextNode(this.title));
        var unorderedList = document.createElement('ul');
        this.messages.forEach(function(message){
            var list = document.createElement('li');
            list.appendChild(document.createTextNode(message));
            unorderedList.appendChild(list);
        });
        element('messageModalMessages').appendChild(unorderedList);
        element('messageModal').style.display = "block";
    }

    close(){
        if(this.callback !== null && typeof this.callback == 'function'){
            this.callback();
        }
        element('messageModalTitle').innerHTML = null;
        element('messageModalMessages').innerHTML = null;
        element('messageModal').style.display = "none";
    }
}

var messageModal = new MessageModal();

element('messageModalConfirm').onclick = function() {
    messageModal.close();
}

element('messageModalClose').onclick = function() {
    messageModal.close();
}