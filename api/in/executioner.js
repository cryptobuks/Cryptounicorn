import { Contract, User } from "./models"
const Sandbox = require("safe-eval")

export default () => {
  let contracts = []


  /* Execute Contracts */
  setInterval(async () => {
    /* Fetch Contracts */
    contracts = await Contract.find({})
    console.log("Contract Iteration")
    for(let contract of contracts) {
      /* Check if eligible for execution */
      console.log(contract.ts_execution > Math.trunc(new Date().getTime() / 1000), contract.ts_execution, Math.trunc(new Date().getTime() / 1000));
      if(contract.ts_execution > Math.trunc(new Date().getTime()/1000) || contract.executed)
        continue

      /* Mark as executed */
      contract.executed = true
      contract.save()

      /* Execute */
      console.log("Executing contract: " + contract._id + " by " + contract.author_name)
      let value = Sandbox("(" + contract.code + ")()", null, { timeout: 5000 })
      console.log("Execution outcome: " + value);

      /* Participation analysis */
      let winners = []
      let losers = []
      let totallost = 0
      let totalwinnerbet = 0
      for(let participation of contract.participations) {
        if(participation.answer == value) {
          winners.push({
            id: participation.author_id,
            name: participation.author_name,
            amount: participation.amount
          })
          totalwinnerbet += participation.amount
        }
        else {
          losers.push({
            id: participation.author_id,
            name: participation.author_name,
            amount: participation.amount
          });
          totallost += participation.amount
        }
      }

      /* Determine winnings and losses */
      winners.map(winner => {
        winner.amountwon = Math.trunc(100 * totallost * (winner.amount / totalwinnerbet)) / 100
      })

      console.log("Total Lost Amount:\n" + totallost)
      console.log("Total Winner Bet Amount:\n" + totalwinnerbet)
      console.log("Winners:\n" + winners)
      console.log("Losers:\n" + losers)

      for(let loser of losers) {
        let user = await User.findOne({ _id: loser.id })
        user.details.unicorns -= loser.amount
        await user.save()
      }
      for(let winner of winners) {
        let user = await User.findOne({ _id: winner.id })
        user.details.unicorns += winner.amountwon
        await user.save()
      }

      /* Save outcome */
      contract.outcome = {
        value: value,
        winners: winners,
        losers: losers,
        totallost: totallost,
        totalwinnerbet: totalwinnerbet
      }
      await contract.save()
    }
  }, 3000)
}
