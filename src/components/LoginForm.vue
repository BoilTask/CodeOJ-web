<template>
	
	 <Form ref="formLogin" :model="formLogin" :rules="ruleLogin" >
        <FormItem prop="user" label="用户名">
            <Input type="text" v-model="formLogin.user" placeholder="Username">
                <Icon type="ios-person-outline" slot="prepend"></Icon>
            </Input>
        </FormItem>
        <FormItem prop="password" label="密码">
            <Input type="password" v-model="formLogin.password" placeholder="Password" v-on:on-enter="handleSubmit('formLogin')">
                <Icon type="ios-lock-outline" slot="prepend"></Icon>
            </Input>
        </FormItem>
        <FormItem>
            <Button type="primary" @click="handleSubmit('formLogin')">登录</Button>
        </FormItem>
    </Form>
</template>

<script>
	export default {
		name: 'LoginForm',
		data () {
            return {
                formLogin: {
                    user: '',
                    password: ''
                },
                ruleLogin: {
                    user: [
                        { required: true, message: '请输入用户名', trigger: 'blur' },
                    	{ type: 'string', min: 3, max: 20, message: '所输用户名格式不符！', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' },
                        { type: 'string', min: 6, max: 20, message: '所输密码格式不符！', trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            handleSubmit(name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
						this.$Spin.show();
						axios
							.post(this.$store.state.API_ROOT + 'user/login',
							'user_id='+this.formLogin.user+'&password='+this.formLogin.password)
							.then(response => {
								this.$Spin.hide();
								if(response.data.ret==200 && response.data.data.isMatch){
									
									this.$store.commit('Login',{
										  user_id: response.data.data.user_id,
										  token:response.data.data.token,
										})
										
									this.$Message.success('Success!');
									this.$store.commit('drawerChange',false)
									this.$router.go(0)
								}else{
									if(response.data.msg=="")
										this.$Message.error('登录失败，请检查输入！');
									else
										this.$Message.error(response.data.msg);
								}
								
							}).catch(function(error) {
								this.$Spin.hide();
								console.log(error);
							});
                    } else {
                        this.$Message.error('请检查输入!');
                    }
                })
            }
        }
	}
</script>

<style>
</style>
