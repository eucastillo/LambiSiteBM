var workbook = null;
var config = null;

$(function () {
	OnLoad();
});

$(".btnSidebar").click(function () {
	$(this).toggleClass("click");
	$(".sidebar").toggleClass("show");
	$(".container").toggleClass("sidebarContent");
});

$(".sidebar ul li a").click(function () {
	var id = $(this).attr("id");
	$(".active").removeClass("active");
	$("nav ul li ul.item-show-" + id).toggleClass("show");
	$("nav ul li #" + id + " span").toggleClass("rotate");
	$(this).toggleClass("active");
});

// $("nav ul li").click(function () {
//     $(this).addClass("active").siblings().removeClass("active");
// });

var OnLoad = async () => {
	document.getElementById("applyBtn").disabled = true;
	await readConfig();

	await readXls();

	await initElements();
	await fillDataTable();

	document.getElementById("applyBtn").disabled = false;
};

var loadFile = (path, responseType) => {
	return new Promise(function (resolve, reject) {
		let xhr = new XMLHttpRequest();

		xhr.open("GET", path, true);
		xhr.responseType = responseType;

		xhr.onload = function () {
			if (this.status >= 200 && this.status < 300) {
				resolve(xhr.response);
			} else {
				reject({
					status: this.status,
					statusText: xhr.statusText,
				});
			}
		};

		xhr.onerror = function () {
			reject({
				status: this.status,
				statusText: xhr.statusText,
			});
		};

		xhr.send();
	});
};

var readXls = async () => {
	let xlsFile = await loadFile(config.excelPath, "arraybuffer");

	workbook = XLSX.read(xlsFile, { type: "buffer" });
};

var readConfig = async () => {
	config = await loadFile("../config.json", "json");
};

var reloadFiles = async () => {
	await readConfig();

	await readXls();
};

var initElements = async () => {
	await initSwitch();
};

var initSwitch = async () => {
	let toJson = XLSX.utils.sheet_to_json(workbook.Sheets["CatTipoPrueba"]);

	toJson.forEach((data) => {
		let formCheck = document.createElement("div");
		formCheck.classList.add("form-check", "form-switch", "m-2");

		let inputCheck = document.createElement("input");
		inputCheck.classList.add("form-check-input");
		inputCheck.type = "checkbox";
		inputCheck.checked = true;
		inputCheck.id = data.ClaveDescripcion;
		inputCheck.setAttribute("columnas", data.Columnas);

		let labelCheck = document.createElement("label");
		labelCheck.classList.add("form-check-label");
		labelCheck.htmlFor = data.ClaveDescripcion;
		labelCheck.textContent = data.Descripcion;

		formCheck.appendChild(inputCheck);
		formCheck.appendChild(labelCheck);

		document.getElementById("switchGroup").appendChild(formCheck);
	});
};

var setColumns = () => {
	let columns = [
		{ title: "Plataforma", data: "Plataforma" },
		{ title: "Marca", data: "Marca" },
		{ title: "Talla", data: "Talla" },
	];
};

var fillDataTable = async () => {
	let toJson = XLSX.utils.sheet_to_json(workbook.Sheets["TraDatosPromediados"]);

	let table = $("#resultados").DataTable({
		//scrollX: true,
		autoWidth: true,
		colReorder: true,
		searching: false,
		ordering: false,
		info: false,
		paging: false,
		// language: {
		//     url: "dataTables.german.json",
		// },
		data: toJson,
		columns: [
			// { title: "Plataforma", data: "Plataforma" },
			// { title: "Marca", data: "Marca" },
			// { title: "Talla", data: "Talla" },
			{ title: "Largo Pad", data: "Largo Pad" },
			{ title: "Peso Total", data: "Peso Total" },
			{ title: "Capacidad de Absorci??n Total", data: "Capacidad de Absorci??n Total" },
			{ title: "Capacidad de Retenci??n Total", data: "Capacidad de Retenci??n Total" },
			{ title: "Peso del chasis", data: "Peso del chasis" },
			{ title: "Peso del chasis", data: "Peso del chasis" },
			{ title: "Peso del chasis", data: "Peso del chasis" },
			{ title: "Peso del chasis", data: "Peso del chasis" },
			{ title: "Peso del chasis", data: "Peso del chasis" },
			{ title: "Peso del chasis", data: "Peso del chasis" },
			{ title: "Peso del chasis", data: "Peso del chasis" },

			//{ title: "ClaveDescripcion", data: "ClaveDescripcion" },
			//{ title: "Descripcion", data: "Descripcion" },
		],
	});

	var lalala = table.colReorder.transpose(0);
};
