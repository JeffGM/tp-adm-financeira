 
  /*Recebendo os parâmetros */
  var taxaTR = 0
  var totalPoupanca = 0
  var totalCDB = 0
  var totalLCI = 0
  var totalTesouroSelic = 0
  var totalIPCA = 0

  function transformarTaxaMensal(taxa){
    var i = ((Math.pow((1 + (taxa)), (1 / 12))) - 1)
    return parseFloat(i.toFixed(5))
  }

  function valorFuturo(valorDaAplicacao, taxaMensal, periodoPermanencia, aporteMensal) {
    if(aporteMensal == null || aporteMensal == 0 || aporteMensal == undefined) {
      return ((valorDaAplicacao * (Math.pow(1 + taxaMensal, periodoPermanencia))))
    }
  
    return ((valorDaAplicacao * (Math.pow(1 + taxaMensal, periodoPermanencia))) + (aporteMensal*(Math.pow(1+taxaMensal, periodoPermanencia) - 1)/ taxaMensal))
  }

  //Inicio do cálculo da poupança
  function calcularPoupanca(valorDaAplicacao, taxaTR, taxaSelic, periodoPermanencia, aporteMensal){
    let rendimentoPoupanca = 0 
    let poupancaElement = document.getElementById(currentCardOrder["poupanca"]["element"]);

    if(taxaSelic > 8.5){
      rendimentoPoupanca = 0.05 + taxaTR
    }else{
      rendimentoPoupanca = (taxaSelic/100 * (70/100)) + taxaTR
    }
    
    let taxaMensal = transformarTaxaMensal(rendimentoPoupanca)
    console.log(rendimentoPoupanca)
    console.log( valorFuturo(valorDaAplicacao, taxaMensal, periodoPermanencia, aporteMensal))
    let valorRendimentoPoupanca = valorFuturo(valorDaAplicacao, taxaMensal, periodoPermanencia, aporteMensal) - valorDaAplicacao  - (aporteMensal * periodoPermanencia)
  
    poupancaElement.querySelector("#brute-value").innerHTML = formatNumberToCurrency(valorRendimentoPoupanca)
    poupancaElement.querySelector("#ir-tax").innerHTML = "Isento"
    poupancaElement.querySelector("#liquid-value").innerHTML = formatNumberToCurrency(valorRendimentoPoupanca)

    totalPoupanca = valorRendimentoPoupanca.toFixed(2)

    currentCardOrder["poupanca"]["liquidValue"] = valorRendimentoPoupanca;

  }

  // Fim do cálculo da poupança
  
  // Inicio do Cálculo do CDB

  function formatNumberToCurrency(number) {
      return "R$ " + number.toFixed(2).toString().replace(".", ",")
  }

  function calcularCDB(valorDaAplicacao, taxaDI, rendimentoOferecidoCDB, periodoPermanencia, aporteMensal){

    let rendimentoCDB = (taxaDI/100) * (rendimentoOferecidoCDB/100)
    let taxaImpostoReda = 0
    let valorImpostoDeRenda = 0

    if (periodoPermanencia <= 6) {
      taxaImpostoReda = 0.225
    } else if (periodoPermanencia > 6 && periodoPermanencia <= 12) {
      taxaImpostoReda = 0.20

    } else if (periodoPermanencia > 12 && periodoPermanencia <= 24) {
      taxaImpostoReda = 0.175

    } else if (periodoPermanencia >= 24) {
      taxaImpostoReda = 0.15
    }
    let cdbElement = document.getElementById(currentCardOrder["cdb"]["element"]);

    let taxaMensal = transformarTaxaMensal(rendimentoCDB)
    let rendimentoTotalCDB = valorFuturo(valorDaAplicacao, taxaMensal, periodoPermanencia, aporteMensal) - valorDaAplicacao - (aporteMensal * periodoPermanencia)
    
    valorImpostoDeRenda = taxaImpostoReda * rendimentoTotalCDB

    cdbElement.querySelector("#brute-value").innerHTML = formatNumberToCurrency(rendimentoTotalCDB)

    
    cdbElement.querySelector("#ir-tax").innerHTML = formatNumberToCurrency(valorImpostoDeRenda) 

    let valorRedimentoCDB = rendimentoTotalCDB - valorImpostoDeRenda
    cdbElement.querySelector("#liquid-value").innerHTML = formatNumberToCurrency(valorRedimentoCDB)  

    totalCDB = valorRedimentoCDB.toFixed(2)

    currentCardOrder["cdb"]["liquidValue"] = valorRedimentoCDB;

  }

  // Fim do Cálculo do CDB

  // Inicio do cálculo do IPCA
  function calcularIPCA(valorDaAplicacao, taxaIPCA, periodoPermanencia, aporteMensal){

    let rendimentoIPCA = (taxaIPCA/100)
    let taxaImpostoReda = 0
    let valorImpostoDeRenda = 0
    let tIpca = document.getElementById(currentCardOrder["tipca"]["element"]);

    if (periodoPermanencia <= 6) {
      taxaImpostoReda = 0.225
    } else if (periodoPermanencia > 6 && periodoPermanencia <= 12) {
      taxaImpostoReda = 0.20

    } else if (periodoPermanencia > 12 && periodoPermanencia <= 24) {
      taxaImpostoReda = 0.175

    } else if (periodoPermanencia >= 24) {
      taxaImpostoReda = 0.15
    }

    let taxaMensal = transformarTaxaMensal(rendimentoIPCA)
    let rendimentoTotalIPCA = valorFuturo(valorDaAplicacao, taxaMensal, periodoPermanencia, aporteMensal) - valorDaAplicacao - (aporteMensal * periodoPermanencia)

    tIpca.querySelector("#brute-value").innerHTML = formatNumberToCurrency(rendimentoTotalIPCA)  

    valorImpostoDeRenda = taxaImpostoReda * rendimentoTotalIPCA
    tIpca.querySelector("#ir-tax").innerHTML = formatNumberToCurrency(valorImpostoDeRenda)  

    let valorRedimentoIPCA = rendimentoTotalIPCA - valorImpostoDeRenda
    tIpca.querySelector("#liquid-value").innerHTML = formatNumberToCurrency(valorRedimentoIPCA)  

    totalIPCA = valorRedimentoIPCA.toFixed(2)

    currentCardOrder["tipca"]["liquidValue"] = valorRedimentoIPCA;

  }

  // Fim do Cálculo do IPCA

  // Inicio do cálculo do LCA
  function calcularLCI(valorDaAplicacao, taxaDI, rendimentoOferecidoLC, periodoPermanencia, aporteMensal){
  
    let rendimentoLCI = (taxaDI/100) * (rendimentoOferecidoLC/100)
    let taxaMensal = transformarTaxaMensal(rendimentoLCI)
    let lciElement = document.getElementById(currentCardOrder["lci"]["element"]);

    let valorRendimentoLCI = valorFuturo(valorDaAplicacao, taxaMensal, periodoPermanencia, aporteMensal) - valorDaAplicacao - (aporteMensal * periodoPermanencia)

    lciElement.querySelector("#brute-value").innerHTML = formatNumberToCurrency(valorRendimentoLCI)  
    lciElement.querySelector("#ir-tax").innerHTML = "Isento"
    lciElement.querySelector("#liquid-value").innerHTML = formatNumberToCurrency(valorRendimentoLCI)  

    totalLCI = valorRendimentoLCI.toFixed(2)
    currentCardOrder["lci"]["liquidValue"] = valorRendimentoLCI;

  }
  //  Fim do cálculo do LCA

  // Inicio da tesouro selic
  function calcularTesouroSelic(valorDaAplicacao, taxaSelic, periodoPermanencia, aporteMensal){
  
    let rendimentoTesouroSelic = taxaSelic/100
    let selicElement = document.getElementById(currentCardOrder["selic"]["element"]);

    if (periodoPermanencia <= 6) {
      taxaImpostoReda = 0.225
    } else if (periodoPermanencia > 6 && periodoPermanencia <= 12) {
      taxaImpostoReda = 0.20

    } else if (periodoPermanencia > 12 && periodoPermanencia <= 24) {
      taxaImpostoReda = 0.175

    } else if (periodoPermanencia >= 24) {
      taxaImpostoReda = 0.15
    }

    let taxaMensal = transformarTaxaMensal(rendimentoTesouroSelic)

    let rendimentoTotalTesouroSelic = valorFuturo(valorDaAplicacao, taxaMensal, periodoPermanencia, aporteMensal) - valorDaAplicacao - (aporteMensal * periodoPermanencia)
    selicElement.querySelector("#brute-value").innerHTML = formatNumberToCurrency(rendimentoTotalTesouroSelic)  

    let valorImpostoDeRenda = taxaImpostoReda * rendimentoTotalTesouroSelic
    selicElement.querySelector("#ir-tax").innerHTML = formatNumberToCurrency(valorImpostoDeRenda)  

    let valorRendimentoTesouroSelic = rendimentoTotalTesouroSelic - valorImpostoDeRenda
    selicElement.querySelector("#liquid-value").innerHTML = formatNumberToCurrency(valorRendimentoTesouroSelic)  

    currentCardOrder["selic"]["liquidValue"] = valorRendimentoTesouroSelic;
    totalTesouroSelic = valorRendimentoTesouroSelic.toFixed(2)

  }
  //  Fim do cálculo do tesouro selic
