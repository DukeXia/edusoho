webpackJsonp(["app/js/activity-manage/homework/index"],[
/* 0 */
/***/ (function(module, exports) {

	import BatchSelect from 'app/common/widget/batch-select';
	import QuestionOperate from 'app/common/component/question-operate';
	import Create from './create';
	
	var $from = $('#step2-form');
	new Create($('#iframe-content'));
	new BatchSelect($from);
	new QuestionOperate($from, $("#attachment-modal", window.parent.document));

/***/ })
]);