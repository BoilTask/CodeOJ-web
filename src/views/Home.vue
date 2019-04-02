<template>
	<Layout>
		<Row>
			<Col span="16">
			<Content>

			</Content>
			</Col>
			<Col span="8">
			<Sider width="100%" hide-trigger>

			</Sider>
			</Col>
		</Row>
	</Layout>
</template>

<script>
	export default {
		name: 'Home',
		data() {
			return {
				theme1: 'light',
				value2: '2',
				value3: '1',
				value4: '1-1',
				data1: [{
					title: 'parent 1',
					expand: true,
					children: [{
							title: 'parent 1-1',
							expand: true,
							children: [{
									title: 'leaf 1-1-1'
								},
								{
									title: 'leaf 1-1-2'
								}
							]
						},
						{
							title: 'parent 1-2',
							expand: true,
							children: [{
									title: 'leaf 1-2-1'
								},
								{
									title: 'leaf 1-2-1'
								}
							]
						}
					]
				}]
			}
		}
	}
</script>

<style>

</style>
