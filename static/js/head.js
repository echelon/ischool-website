var PATH = '/head';

var headRotate = function()
{
	var cur = 0;
	var imgs = [
		'DSC_8970.JPG',
		'DSC_8971.JPG',
		'DSC_8972.JPG',
		'DSC_8973.JPG',
		'DSC_8974.JPG',
		'DSC_8975.JPG',
		'DSC_8976.JPG',
		'DSC_8977.JPG',
		'DSC_8978.JPG',
	];

	for (var i = 0; i < imgs.length; i++) {
		imgs[i] = PATH + '/' + imgs[i];
	}

	var changeImage = function() {
		console.log(cur);
		cur = (cur+1) % imgs.length;
		var img = imgs[cur];

		$('img').attr('src', img);
	}

	setInterval(changeImage, 100);
}
