<template lang='pug'>
	.score-board-list
		score-board-item(v-for='(i, $index) in renderArr' :key="$index" :no="i")
</template>

<script>
	import scoreBoardItem from '@/components/scoreBoard/scoreBoardItem'
	export default {
		name: "score-board",
		components:{scoreBoardItem},
		props: ['count'],
		computed: {
			renderArr: function () {
				let countArr = this.count.toString().split('')
				let countArrLength = countArr.length
				let tempArr = []
				for (let i = 1; i <= 8; i++) {
					tempArr.unshift({
						number: i > countArrLength ? '0' : countArr[countArrLength - i],
						prefix: i > countArrLength ? true : false
					})
				}
				return tempArr
			}
		}
	}
</script>

<style lang="stylus" scoped>
	.score-board-list
		.score-board
			margin-right 4px
</style>
