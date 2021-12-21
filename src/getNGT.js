import React, { Component } from 'react'
import './App.css';
import './table.css';
class GetNGT extends Component{
    constructor(props){
        super(props);
        this.state = {
            // Price
            ngtPrice: 0,
            updateTimer: 0,
            php: 0,
            gbp: 0,
            eur: 0,
            brl: 0,
            thb: 0,
            sgd: 0,
            twd: 0,
            cny: 0,
            inr: 0,
            bnb: 0,
            // Sheet
            mp: 0,
            workers: 0,
            minepower: [100,200,300,400,500,600,700,800,900,1000,1100,1200,1300,1400,1500,1600,1700,1800,1900,2000,2100,2200,2300,2400,2500,2600,2700,2800,2900,3000],
            mines: ["El Mirador","Merian","Veladero","El Verde","La Quinta","Parorjo","Buena Vista","Coipasa","Pico y Pala","La Cueva","Tantauco","Patuca","Megantoni","Sirihuani","Santa Rosa","Monte Alegre","La Atravesada","Cuiaba","Agua Caliente","La Purisima","Salobo","Basaseachi","Las Pascuas","Paracatu","Rosebel","Yanaocha","Salvador","Pimentel","El Gago","Cerro Negro"],
            rewards: [5,10,15,20,26,33,39,45,51,58,71,80,90,99,112,120,132,144,157,170,223,242,263,286,310,335,362,391,421,453],
            success_chance: [.88,.86,.84,.82,.80,.78,.76,.74,.72,.70,.68,.66,.64,.62,.60,.58,.56,.54,.52,.50,.50,.50,.50,.50,.50,.50,.50,.50,.50,.50],
            // UI
            visibilityNormal: "",
            visibilityFleet: "",
            inputVisFleet: "",
            sheetInfo: "",
            visInfo: "",
            visCredits: "",
            btnHighlightInfo: "btn btn-custom mobile-margin",
            btnHighlightFleet: "btn stretch mobile-margin",
            showFixedHeader: "d-none",
            // UI
            selectDays: "7",
            currency: "USD",
            currencySymbol: "$",
            errorMP: "Not Enough MP",
            averageWorkers: 0,
            mintAmt: 1,
            // Language
            visLangSelect: "EN",
            visEn: ""
        }
        this.setWorkers = this.setWorkers.bind(this);
    }

    async loadData(){
        const url = "https://api.pancakeswap.info/api/v2/tokens/0x370527c29113aad172d1def6c42d0c924df124ce"
        const response = await fetch(url);
        const data = await response.json();
        this.setState({ngtPrice: data["data"]["price"]})
    }

    async componentDidMount() {
        this.loadData()
        this.updateTimer = setInterval(() => this.loadData(), 5000);
    }

    async componentWillUnmount() {
        clearInterval(this.updateTimer);
    }
    // Headers UI
    setDays = (event) => {
        this.setState({ selectDays: event.target.value });
      };
    setWorkers(event){
        this.setState({workers: event.target.value})
    }

    //(Who called in the) Fleet

    getMinePower(i){
        return this.state.minepower[i]
    }

    // ETERNAL ALWAYS in USD
    getMineNugget(i){
        return parseFloat(this.state.rewards[i]/this.state.ngtPrice).toFixed(2)
    }
    

    //Printing
    getNormalizedReward(i){
        return parseFloat(this.state.rewards[i] * this.state.selectDays * this.state.success_chance[i]).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})
    }

    //Contracts
    getContractCost(){
        if (this.state.selectDays === "30"){
            return parseFloat(30/this.state.ngtPrice).toFixed(4)
        } else if (this.state.selectDays === "15"){
            return parseFloat(15/this.state.ngtPrice).toFixed(4)
        } 
        else if (this.state.selectDays === "7"){
            return parseFloat(7/this.state.ngtPrice).toFixed(4)
        }
    }
    getContractDays(){
        if (this.state.selectDays === "30"){
            return 30
        } else if (this.state.selectDays === "15"){
            return 15
        } else if (this.state.selectDays === "7"){
            return 7
        } 
    }

    getConvoyContractCostNGT(){
        return parseFloat(((this.getContractDays()*this.state.workers)/this.state.ngtPrice)).toFixed(2)
    }

    getConvoyContractCostUSD(){
        return parseFloat((this.getContractDays()*this.state.workers)).toFixed(2)
    }
 
    getConvoyNet(i){
        return this.state.currencySymbol+parseFloat(((this.state.rewards[i] * this.state.selectDays) * (this.state.success_chance[i])) - this.getConvoyContractCostUSD()).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})
    }
    render(){
        return(
            <div class="container-fixed px-3">
                <div class="container-fluid px-1">
                    <div class="container-fluid">

                        <div class="d-none d-lg-block px-0 mx-0">
                            <div class="row"> 

                                <div class="col-12">

                                    <div class={this.state.visEn+" row d-flex sm-flex align-items-start border border-2 border-dark"}> 
                                        <div class="col-4  row">
                                            <div class="col-1"></div>
                                            <div class="col-5 mt-3 ml-0 pl-0">
                                                <p class="getEternalHeader"><b>USD / NGT</b> -{'>'} <span class="text-primary">{parseFloat(this.state.ngtPrice).toFixed(2)}</span></p>
                                            </div>
                                        </div>
                                        <div class="row col-4">
                                            <div class="col-1"></div>
                                            <div class="col-3"><select class="form-select getEternalHeader select-days" onChange={this.setDays} aria-label="Default select">
                                            <option selected value="7">7 Days</option>
                                            <option value="15">15 Days</option>
                                            <option value="30">30 Days</option>
                                            </select></div>
                                            <div class="col-8 mt-3"><p class="getEternalHeaderL"><b>Contract / Miner</b> -{'>'} <span class="text-primary">{this.getContractCost()} NGT</span> </p></div>
                                        </div>
                                        <div class="col-4 row">
                                            <div class="col-6"></div>
                                            <div class="col-6"><p class="getEternalHeader text-left-TRUE mt-3 ml-0 pl-0"> <b>Minting</b> -{'>'} <span class="text-primary">{parseFloat(20/this.state.ngtPrice).toFixed(4)} NGT</span> </p></div>
                                        </div>
                                    </div>

                                </div>

                            </div>
                            
                        </div>
                        {/* Mobile View */}
                        <div class="d-xs-block d-sm-none px-0 mx-0">
                            <div class="row d-flex sm-flex align-items-start border border-2 border-dark"> 
                                <p class="col-4 getEternalHeaderM mt-3"> <b>USD/NGT</b>:<br/>  <span class="text-primary">{parseFloat(this.state.ngtPrice).toFixed(2)}</span></p>
                                <p class="col-4 getEternalHeaderM mt-3"> <b>Contract 7d: </b><br/> <span class="text-primary">{this.getContractCost()} NGT</span> </p>
                                <p class="col-4 getEternalHeaderM mt-3"> <b>Minting</b>: <br/><span class="text-primary">{parseFloat(20/this.state.ngtPrice).toFixed(4)} NGT</span> </p>
                            </div>
                        </div>
                    </div>

                    <div class="d-none d-lg-block px-0 mx-0">

                    <div class="col-12 mt-4 row">
                        <div class="col-2">
                            <p class="text-right1">All info can be found in: <a href="https://docs.cryptominesclassic.app/cryptomines-classic/gameplay/introduction" rel="noreferrer" target="_blank">WhitePaper</a></p>
                        </div>
                        <div class="col-10"><p class="text-right1"><b>Note: You can't mine on mines higher than your convoy's MP. The success rate for each mine is a fixed value and will not vary depending on your convoy's Mining Power.</b></p></div>
                    </div>


                    <div class="col-12 mt-2 d-flex flex-row">
                        <div class="col-1 mt-2 ">
                        <p class="text-right">Enter # of Miners:</p>
                        </div>
                        <div class="col-1">
                            <input type="number" class="input-group-text" onChange={this.setWorkers}></input>
                        </div>
                        <div class="col-6 mt-2">
                            <p class="text-right1">This affects Net Profit due to more/less contracts needed</p>
                        </div>
                    </div>


                    </div>


                    <div class="d-xs-block d-sm-none px-0 mx-0">
                    <div class="col-12 mt-3 row">
                        <div class="col-6 mt-2">
                        <p class="text-left">Enter # of Miners:</p>
                        </div>
                        <div class="col-6 px-0 mx-0">
                            <input type="number" class="input-group-text" onChange={this.setWorkers}></input>
                        </div>
                    </div>
                    </div>

                    
                        <div id="fleet" class={this.state.visibilityFleet + "mt-2 overflow"}>

                            <table>
                                <tr class={this.state.visEn+" border border-secondary"}>
                                    <th class="border border-2 border-secondary">#</th>
                                    <th class="border extra-padding border-2 border-secondary">Mines</th>
                                    <th class="border border-2 border-secondary">MP</th>
                                    <th class="border border-2 border-secondary">Mine Reward (NGT)</th>
                                    <th class="border border-2 border-secondary">Mine Reward (USD)</th>
                                    <th class="border border-2 border-secondary">Success Rate</th>
                                    <th class="border border-2 border-secondary">{this.state.selectDays}d Normalized Reward</th>
                                    <th class="border border-2 border-secondary">{this.state.selectDays}d Contract Cost (NGT)</th>
                                    <th class="border border-2 border-secondary">{this.state.selectDays}d Contract Cost (USD)</th>
                                    <th class="border border-2 border-secondary">Net Profit / {this.state.selectDays}d</th>
                                </tr>
                                {/* Fleet */}
                                {(() => {
                                    const print = [];
                                    for (let i=0; i<30; i++){
                                        print.push(
                                            <tr>
                                                <td class="border border-secondary">{i+1}</td>
                                                <td class="border border-secondary">{this.state.mines[i]}</td>
                                                <td class="border border-secondary purp">{this.getMinePower(i)}</td>
                                                <td class="border border-secondary text-primary">{this.getMineNugget(i)} NGT</td>
                                                <td class="border border-secondary">${parseFloat(this.state.rewards[i]).toFixed(2)}</td>
                                                <td class="border border-secondary text-secondary"><b>{parseFloat(this.state.success_chance[i]*100).toFixed(0)}%</b></td>
                                                <td class="border border-secondary">${this.getNormalizedReward(i)}</td>
                                                <td class="border border-secondary text-primary">{this.getConvoyContractCostNGT()} NGT</td>
                                                <td class="border border-secondary">${this.getConvoyContractCostUSD()}</td>
                                                <td class="border border-secondary">{this.getConvoyNet(i)}</td>
                                            </tr>
                                        )
                                    }
                                    return print
                                })()}
                            </table>


                        </div>
                        <div class="d-none d-lg-block px-0 mx-0">
                            <div class={this.state.visCredits}>
                                <div class="row align-items-start mt-6">
                                    
                                    <div class="col-6">
                                        <p class="disclaimer">
                                        Disclaimer: <br/>
                                        All values are approximation and should only be used as a template. 
                                        <br/>
                                        NGT/USD updates are from PancakeSwap API
                                        <br/>
                                        Mobile View is available.
                                        </p>
                                        
                                    </div>
                                    <div class="col-6">
                                        <p class="credits text-info">
                                        <br/>
                                        Found bugs? Want to help? DM me directly in Discord: Jucci#0007
                                        <br/>
                                        If you found this sheet helpful: <button class="btn text-size-12 text-info px-0 mx-0 mb-0 py-0" data-bs-container="body" data-bs-toggle="popover" data-bs-placement="top" data-bs-content="Copied!" onClick={() => {navigator.clipboard.writeText("0x1e206BD3B8253AEa904353f89bbE67f122Fbc149")}}>0x1e206BD3B8253AEa904353f89bbE67f122Fbc149</button> 
                                        </p>
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                        <div class="d-xs-block d-sm-none px-0 mx-0">
                            
                            <div class={this.state.visCredits}>
                                <div class="row mt-2">
                                <div class="col-12">
                                    
                                    <p class="disclaimer1">
                                    Disclaimer: 
                                    <br/>
                                    All values are approximation and should only be used as a template. 
                                    <br/>
                                    NGT/USD updates are from PancakeSwap API
                                    <br/>
                                    Mobile View is available.
                                    </p>
                                </div>
                                <div class="col-12">
                                    <p class="credits1 text-info">
                                    <br/>
                                    Found bugs? Want to help? DM me directly in Discord: Jucci#0007
                                    <br/>
                                    If you found this sheet helpful: <br/><button class="btn text-info px-0 mx-0 text-size-10" data-bs-container="body" data-bs-toggle="popover" data-bs-placement="top" data-bs-content="Copied!" onClick={() => {navigator.clipboard.writeText("0x1e206BD3B8253AEa904353f89bbE67f122Fbc149")}}>0x1e206BD3B8253AEa904353f89bbE67f122Fbc149</button>
                                    </p>
                                </div>
                                        
                                </div>
                                
                            </div>
                        </div>
                </div>
            </div>
        )
    }
}
export default GetNGT
