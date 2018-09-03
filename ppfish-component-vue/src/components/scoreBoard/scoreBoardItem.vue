<template lang='pug'>
	.score-board(:class="{'changing': changing, 'changed': changed, 'prefix': no.prefix}")
		span.current.top {{ val }}
		span.next.top {{ nextVal }}
		span.current.bottom {{ val }}
		span.next.bottom {{ nextVal }}
</template>

<script>
	export default {
		name: "score-board",
		props: ['no'],
		created () {
			this.val = this.no.number
			this.nextVal = this.no.number
		},
		watch: {
			no: function (newVal, oldVal) {
				this.update(newVal)
			}
		},
		data () {
			return {
				val: '0',
				nextVal: '0',
				changing: false,
				changed: true
			}
		},
		methods: {
			update (newVal) {
				let _this = this
				_this.val = _this.nextVal
				_this.nextVal = newVal.number
					_this.changed = false
				setTimeout(function() {
					_this.changing = true
				}, 20)
				setTimeout(function() {
					_this.changing = false
					_this.changed = true
				}, 920)
			}
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
	.score-board
		display inline-block
		font-size  0
		position relative
		width 72px
		height 120px
		overflow hidden
		color #EDA532
		-moz-perspective 500px
		-webkit-perspective 500px
		perspective 500px
		-moz-transform translateZ(0)
		-webkit-transform translateZ(0)
		transform translateZ(0)
		&.prefix
			color #52B8DF
		span
			position absolute
			width 100%
			display block
			background #0A2457
			line-height 120px
			font-size 80px
			text-align center
			-moz-transform-origin 0 60px 0
			-webkit-transform-origin 0 60px 0
			transform-origin 0 60px 0
			&:before
			 	border-bottom 2px solid #000
				content ""
				left 0
				position absolute
				width 100%
			&:after
				content: "";
				height: 100%;
				left: 0;
				position: absolute;
				top: 0;
				width: 100%
			&.top
				height 50%
				overflow: hidden
			&.bottom
				height 100%
		.top:before
			content ''
			border-top 2px solid #081936
			border-bottom 2px solid #16336C
			left 0
			position absolute;
			bottom 0
			width 100%;
		.top
			overflow: hidden
		.next.top
			z-index 3
		.current.top
			z-index 4
		.next.bottom
			z-index 2
			-moz-transform rotate3d(1,0,0,90deg)
			-ms-transform rotate3d(1,0,0,90deg)
			-webkit-transform rotate3d(1,0,0,90deg)
			transform rotate3d(1,0,0,90deg)
		.current.bottom
			z-index 1
		&.changing
			.current.top
				-moz-transform rotate3d(1,0,0,-90deg)
				-ms-transform rotate3d(1,0,0,-90deg)
				-webkit-transform rotate3d(1,0,0,-90deg)
				transform rotate3d(1,0,0,-90deg)
				-moz-transition -moz-transform .2625s ease-in,box-shadow .2625s ease-in
				-o-transition -o-transform .2625s ease-in,box-shadow .2625s ease-in
				-webkit-transition -webkit-transform .2625s ease-in,box-shadow .2625s ease-in
				transition transform .2625s ease-in,box-shadow .2625s ease-in
			.bottom.next
				-moz-transition box-shadow .175s cubic-bezier(.375,1.495,.61,.78) .35s,-moz-transform .35s cubic-bezier(.375,1.495,.61,.78) .35s
				-o-transition box-shadow .175s cubic-bezier(.375,1.495,.61,.78) .35s,-o-transform .35s cubic-bezier(.375,1.495,.61,.78) .35s
				-webkit-transition box-shadow .175s cubic-bezier(.375,1.495,.61,.78),-webkit-transform .35s cubic-bezier(.375,1.495,.61,.78)
				-webkit-transition-delay .35s,.35s
				transition box-shadow .175s cubic-bezier(.375,1.495,.61,.78) .35s,transform .35s cubic-bezier(.375,1.495,.61,.78) .35s
				-moz-transform rotate3d(1,0,0,0)
				-ms-transform rotate3d(1,0,0,0)
				-webkit-transform rotate3d(1,0,0,0)
				transform rotate3d(1,0,0,0)
		&.changed
			.top.current,.bottom.current
				display none
			.bottom.next
				-moz-transition box-shadow .175s cubic-bezier(.375,1.495,.61,.78) .35s,-moz-transform .35s cubic-bezier(.375,1.495,.61,.78) .35s
				-o-transition box-shadow .175s cubic-bezier(.375,1.495,.61,.78) .35s,-o-transform .35s cubic-bezier(.375,1.495,.61,.78) .35s
				-webkit-transition box-shadow .175s cubic-bezier(.375,1.495,.61,.78),-webkit-transform .35s cubic-bezier(.375,1.495,.61,.78)
				-webkit-transition-delay .35s,.35s
				transition box-shadow .175s cubic-bezier(.375,1.495,.61,.78) .35s,transform .35s cubic-bezier(.375,1.495,.61,.78) .35s
				-moz-transform rotate3d(1,0,0,0)
				-ms-transform rotate3d(1,0,0,0)
				-webkit-transform rotate3d(1,0,0,0)
				transform rotate3d(1,0,0,0)
</style>
