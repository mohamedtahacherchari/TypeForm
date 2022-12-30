$(document).ready(function () {

    function FormViewModel() {
        this.prenom = null;
        this.nom = null;
        this.prevenir_nom_prenom = null;
        this.prevenir_telephone = null;
    }
    var formViewModel = new FormViewModel();

    function warning(text) {
        var warningHtml = '<div class="alert"><button type="button" class="close" data-dismiss="alert">&times;</button><strong>Attention!</strong><p>' + text + '</p></div>';
        $('#form').prepend(warningHtml);
    }

    if (Modernizr.localstorage) {
        $('#save').removeClass('hidden');
        for (var prop in formViewModel) {
            formViewModel[prop] = localStorage['formulaire.' + prop];
        }
    } else {
        warning('Votre navigateur ne supporte pas l\'enregistrement de données. Cf <a href="http://caniuse.com/namevalue-storage">http://caniuse.com/namevalue-storage</a>. ' +
            'Les données que vous allez saisir ne pourront pas être sauvegardées.');
    }

    if (typeof(FileReader) === 'function' && Modernizr.draganddrop) {
        $('#import').removeClass('hidden');
    } else {
        warning('Votre navigateur ne supporte pas le glisser-déposer de fichier local. Cf <a href="http://caniuse.com/#feat=filereader">http://caniuse.com/#feat=filereader</a>. ' +
            'Vous ne pourrez pas importer de formulaire préalablement exporté.');
    }

    $('#file').on('change', function (evt) {
        var files = evt.target.files;
        for (var i = 0, f; f = files[i]; i++) {
            if (!f.type.match('application/json')) {
                continue;
            }

            var reader = new FileReader();

            reader.onload = function (e) {
                formViewModel = JSON.parse(e.target.result);
                ko.applyBindings(formViewModel);
            };
            reader.readAsText(f);
        }
    });

    $('ul.nav li').click(function () {
        var nav_id = $(this).attr('id');
        var content_id = nav_id.replace('-navbar', '');

        $('.content').addClass('hidden');
        $('#' + content_id).removeClass('hidden');
        $('ul.nav li').removeClass('active');
        $(this).addClass('active');
    });

    $('#export').click(function () {
        uriContent = "data:application/json," + encodeURIComponent(JSON.stringify(formViewModel));
        window.open(uriContent, 'save');
    });

    $('#save').click(function () {
        for (var prop in formViewModel) {
            localStorage['formulaire.' + prop] = formViewModel[prop];
        }
    });


    ko.applyBindings(formViewModel);
});

