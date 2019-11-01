const toolbarOptions = [
      [{ 'font': [] },
      { 'size': ['small', false, 'large', 'huge'] },  // custom dropdown
      { 'header': [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
      ['blockquote', 'code-block'],

      [{ 'header': 1 }, { 'header': 2 }],               // custom button values
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
      [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
      [{ 'direction': 'rtl' }],                         // text direction

      [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme

      [{ 'align': [] }],

      ['clean']                                         // remove formatting button
    ]
    const options = {
      modules: {
        toolbar: toolbarOptions
      },
      placeholder: 'Compose a diary...',
      theme: 'snow'
    };
    const quill = new Quill('#toolbar', options);