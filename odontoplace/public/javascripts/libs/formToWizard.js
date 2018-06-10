/* Created by jankoatwarpspeed.com */

var j;

var focPac;

(function($) {

	$.fn.formToWizard = function(options) {

		options = $.extend({

			submitButton : ""

		}, options);



		var element = this;



		var steps = $(element).find("fieldset");

		var count = steps.size();

		var submmitButtonName = "#" + options.submitButton;

		$(submmitButtonName).hide();



		// 2



		var stepsEl = $("<ul id='steps' ></ul>");

		$(element).before(stepsEl);

		stepsEl.append('<div id="stepsLine"/>');



		steps.each(function(i) {

			$(this).wrap("<div id='step" + i + "'></div>");

			$(this).append("<p id='step" + i + "commands' ></p>");

			if (i == 0) {

				createNextButton(i);

				selectStep(i);

			} else if (i == count - 1) {

				$("#step" + i).hide();

				createPrevButton(i);

			} else {

				$("#step" + i).hide();

				createPrevButton(i);

				createNextButton(i);

			}

		});



		function createPrevButton(i) {

			var stepName = "step" + i;

			$("#" + stepName + "commands").append(

					"<a id='" + stepName + "Prev' class='prev'> </a>");

			$("#" + stepName + "Prev").bind("click", function(e) {

				$("#" + stepName).hide();

				$("#step" + (i - 1)).show();

				$(submmitButtonName).hide();

				selectStep(i - 1);

			});

		}



		function createNextButton(i) {

			var stepName = "step" + i;

			$("#" + stepName + "commands").append(

					"<a id='" + stepName + "Next" + i +"' class='next'></a>");



			$("#" + stepName + "Next" + i + "")

					.bind(

							"click",

							function(e) {



									$("#" + stepName).hide();

									$("#step" + (i + 1)).show();

									if (i + 2 == count)

										$(submmitButtonName).show();

									selectStep(i + 1);

							});



		}



		function selectStep(i) {

			$("#steps li").removeClass("current");

			$("#stepDesc" + i).addClass("current");

		}

		function removeAccentuation(campos) {

			var string = campos;

			var acentos = [ "\u00e1", "\u00e0", "\u00e2", "\u00e3", "\u00f3",

					"\u00f2", "\u00f5", "\u00f4", "\u00ed", "\u00ec", "\u00ee",

					"\u00e9", "\u00e8", "\u00ea", "\u00fa", "\u00f9", "\u00fb",

					"\u00E7" ], letras = [ "a", "a", "a", "a", "o", "o", "o",

					"o", "i", "i", "i", "e", "e", "e", "u", "u", "u", "c" ];



			for (var len = letras.length, i = len - 1; i >= 0; i--) {

				//Improved Native For-Loop

				string = string.replace(acentos[i], letras[i]);

			}

			return string;

		}

	};



})(jQuery);

function alertTom(msg) {

	focPac = msg;

	$('<div class="alertConfir">').appendTo('body').append(

			$('<img alt="imagem" src="img/icons/alerts/alert.png"/>'))

			.append(

					$('<div class="messAlert"/>').text(

							"Campo " + msg + " Obrigatorio")).append(

					$('<footer class="cancelAlert"/>').append(

							$('<a id="cancelAlert">Preencher Campo</a>')));

	$('.cancelAlert').bind('click', Excluir);

	$("#imgstep1").attr("src", "./img/icons/step_1.png").removeClass("alert");



}

function Excluir() {

	var par = $(this).parent();

	par.remove();

	$("#" + focPac + "").focus();

};



function ValidaEmail() {

	var email = $("#Email").val();

	// express�o regular

	var emailValido = /^.+@.+\..{2,}$/;

	var valiEmail = "Email Invalido";

	if (!emailValido.test(email)) {

		alertTom(valiEmail);

		return false;

	} else {

		return true;

	}

}

