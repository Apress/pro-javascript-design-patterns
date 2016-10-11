/* EditInPlaceField object. */

var EditInPlaceField = {
  configure: function(id, parent, value) {
    this.id = id;
    this.value = value || 'default value';
    this.parentElement = parent;

    this.createElements(this.id);
    this.attachEvents();
  },
  createElements: function(id) {
    this.containerElement = document.createElement('div');
    this.parentElement.appendChild(this.containerElement);

    this.staticElement = document.createElement('span');
    this.containerElement.appendChild(this.staticElement);
    this.staticElement.innerHTML = this.value;
    
    this.fieldElement = document.createElement('input');
    this.fieldElement.type = 'text';
    this.fieldElement.value = this.value;
    this.containerElement.appendChild(this.fieldElement);
    
    this.saveButton = document.createElement('input');
    this.saveButton.type = 'button';
    this.saveButton.value = 'Save';
    this.containerElement.appendChild(this.saveButton);    

    this.cancelButton = document.createElement('input');
    this.cancelButton.type = 'button';
    this.cancelButton.value = 'Cancel';
    this.containerElement.appendChild(this.cancelButton);    
        
    this.convertToText();
  },
  attachEvents: function() {
    var that = this;
    addEvent(this.staticElement, 'click', function() { that.convertToEditable(); });
    addEvent(this.saveButton, 'click', function() { that.save(); });
    addEvent(this.cancelButton, 'click', function() { that.cancel(); });
  },
  
  convertToEditable: function() {
    this.staticElement.style.display = 'none';
    this.fieldElement.style.display = 'inline';
    this.saveButton.style.display = 'inline';
    this.cancelButton.style.display = 'inline';        

    this.setValue(this.value);
  },
  save: function() {
    this.value = this.getValue();
    var that = this;
    var callback = {
      success: function() { that.convertToText(); },
      failure: function() { alert('Error saving value.'); }
    };
    ajaxRequest('GET', 'save.php?id=' + this.id + '&value=' + this.value, callback);
  },
  cancel: function() {
    this.convertToText();
  },
  convertToText: function() {
    this.fieldElement.style.display = 'none';
    this.saveButton.style.display = 'none';
    this.cancelButton.style.display = 'none';     
    this.staticElement.style.display = 'inline';

    this.setValue(this.value);
  },
  
  setValue: function(value) {
    this.fieldElement.value = value;
    this.staticElement.innerHTML = value;
  },
  getValue: function() {
    return this.fieldElement.value;
  }
};

var titlePrototypal = clone(EditInPlaceField);
titlePrototypal.configure(' titlePrototypal ', $('doc'), 'Title Here');
var currentTitleText = titlePrototypal.getValue();

/* EditInPlaceArea object. */

var EditInPlaceArea = clone(EditInPlaceField);

// Override certain methods.

EditInPlaceArea.createElements = function(id) {
  this.containerElement = document.createElement('div');
  this.parentElement.appendChild(this.containerElement);

  this.staticElement = document.createElement('p');
  this.containerElement.appendChild(this.staticElement);
  this.staticElement.innerHTML = this.value;
  
  this.fieldElement = document.createElement('textarea');
  this.fieldElement.value = this.value;
  this.containerElement.appendChild(this.fieldElement);
  
  this.saveButton = document.createElement('input');
  this.saveButton.type = 'button';
  this.saveButton.value = 'Save';
  this.containerElement.appendChild(this.saveButton);

  this.cancelButton = document.createElement('input');
  this.cancelButton.type = 'button';
  this.cancelButton.value = 'Cancel';
  this.containerElement.appendChild(this.cancelButton);
      
  this.convertToText();
};
EditInPlaceArea.convertToEditable = function() {
  this.staticElement.style.display = 'none';
  this.fieldElement.style.display = 'block';
  this.saveButton.style.display = 'inline';
  this.cancelButton.style.display = 'inline';

  this.setValue(this.value);
};
EditInPlaceArea.convertToText = function() {
  this.fieldElement.style.display = 'none';
  this.saveButton.style.display = 'none';
  this.cancelButton.style.display = 'none';     
  this.staticElement.style.display = 'block';

  this.setValue(this.value);
};
