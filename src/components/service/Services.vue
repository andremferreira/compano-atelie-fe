<template>
    <div class="services-pages">
        <PageTitle icon="fa fa-inbox" main="Gestão de Serviços" 
                sub="Módulo de Gerenciamento de Serviços Disponíbilizados."/>
            <b-card-group deck> 
                <b-card header="Cadastro e Gestão de Serviços"> 
                    <b-card-text> ... Informações de serviço</b-card-text>
                </b-card>
            </b-card-group>
    </div>
</template>

<script>
import PageTitle from '@/components/template/PageTitle'
export default {
    name: 'Services',
    components: { PageTitle },
    mounted(){
        this.$store.state.isMenuVisible = false
    }
}
</script>

<style>

</style>