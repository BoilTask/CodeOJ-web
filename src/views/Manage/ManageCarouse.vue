<template>
	<Content style="padding: 15px;">
		<Card>
			<Form ref="formData" :model="formData" :label-width="80">
				<FormItem v-for="(item, index) in formData.items" :key="index" :label="'图片 ' + (index+1)" :prop="'items.' + index + '.src'"
				 :rules="{required: true, message: '请填入图片地址！', trigger: 'blur'}">
					<Row>
						<p>
							<Input type="text" v-model="item.src" placeholder="https://XXXX.jpg">
							<span slot="prepend">图片地址：</span>
							</Input>
						</p>
						<p class="inputp">
							<Input type="text" v-model="item.alt" placeholder="description">
							<span slot="prepend">图片描述：</span>
							</Input>
						</p>
						<p class="inputp">
							<Input type="text" v-model="item.url" placeholder="https://codeoj.cn">
							<span slot="prepend">指向链接：</span>
							</Input>
						</p>
						<p class="inputp">
							<Button type="error" @click="handleRemove(index)">Delete</Button>
						</p>
					</Row>
				</FormItem>
				<FormItem>
					<Row>
						<Col span="12">
						<Button type="dashed" long @click="handleAdd" icon="md-add">添加图片</Button>
						</Col>
					</Row>
				</FormItem>
				<FormItem>
					<Button type="primary" @click="handleSubmit('formData')">Submit</Button>
				</FormItem>
			</Form>
		</Card>
	</Content>
</template>

<script>
	export default {
		name: 'ManageCarouse',
		data() {
			return {
				formData: {
					items: [{
						src: '',
						alt: '',
						url: '',
					}]
				}
			}
		},
		mounted() {
			var params = new URLSearchParams();
			axios
				.get(this.$store.state.API_ROOT + 'carouse')
				.then(response => {
					this.formData.items = response.data.data.carouse
					if(!this.formData.items.length){
						this.handleAdd();
					}
				}).catch(function(error) {
					console.log(error);
				});
		},
		methods: {
			handleSubmit(name) {
				this.$refs[name].validate((valid) => {
					if (valid) {
						var params = new URLSearchParams();
						params.append('user_id', this.$store.state.loginInfo.user_id);
						params.append('token', this.$store.state.loginInfo.token);
						params.append('carouse', JSON.stringify(this.formData.items));
						axios
							.post(this.$store.state.API_ROOT + 'manage/carouse', params)
							.then(response => {
								this.$Spin.hide();
								if (response.data.data.is_ok) {
									this.$Message.success('提交成功!');
								} else {
									this.$Message.success('提交失败！');
								}
							}).catch(function(error) {
								this.$Message.success('服务器连接失败！');
							});
					} else {
						this.$Message.error('Fail!');
					}
				})
			},
			handleAdd() {
				this.formData.items.push({
					src: '',
					alt: '',
					url: '',
				});
			},
			handleRemove(index) {
				this.$Modal.confirm({
					title: '警告',
					content: '<p>此操作不可逆，请确认操作无误！</p>',
					onOk: () => {
						this.formData.items.splice(index, 1)
					}
				});
			}
		}
	}
</script>

<style scoped>
	.inputp {
		margin-top: 10px;
	}
</style>
