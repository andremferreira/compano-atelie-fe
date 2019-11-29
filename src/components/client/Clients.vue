<template>
    <div class="services-pages">
        <PageTitle icon="fa fa-inbox" main="Gestão de Clientes" 
                sub="Gerenciamento de Clientes."/>
            <b-card-group deck> 
                <b-card header="Cadastro e Gestão de Clientes"> 
                    <b-card-text> ... Informações dos clientes</b-card-text>
                </b-card>
            </b-card-group>
    </div>
</template>

<script>
import PageTitle from '@/components/template/PageTitle'
export default {
    name: 'Clientes',
    components: { PageTitle }
}
</script>

<style>

</style>