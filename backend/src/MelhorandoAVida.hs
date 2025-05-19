-- Contrato Plutus para o dApp Melhorando a Vida
{-# LANGUAGE DataKinds #-}
{-# LANGUAGE NoImplicitPrelude #-}
{-# LANGUAGE TemplateHaskell #-}

module MelhorandoAVida where

import Plutus.V1.Ledger.Value (TokenName, Value, singleton)
import Plutus.V1.Ledger.Interval (before)
import Plutus.V2.Ledger.Api (ScriptContext(..), TxInfo(..), PubKeyHash, POSIXTime, Validator, mkValidatorScript)
import Plutus.V2.Ledger.Contexts (txSignedBy)
import PlutusTx (compile, makeIsDataIndexed, makeLift)
import PlutusTx.Prelude (Bool(..), Integer, traceIfFalse, length, (&&), (==))

-- Definição de dados
data Cadastro = Cadastro
  { cNome       :: !BuiltinString
  , cCPF        :: !BuiltinString
  , cNecessidade :: !BuiltinString
  , cCreditos   :: !Integer
  , cSelo       :: !TokenName
  }
PlutusTx.makeIsDataIndexed ''Cadastro [('Cadastro, 0)]
PlutusTx.makeLift ''Cadastro

-- Parâmetro do contrato (simplificado)
newtype ContractParams = ContractParams { admin :: PubKeyHash }
PlutusTx.makeIsDataIndexed ''ContractParams [('ContractParams, 0)]
PlutusTx.makeLift ''ContractParams

-- Validação de CPF (simplificado)
validateCPF :: BuiltinString -> Bool
validateCPF cpf = length (unpack cpf) == 11

-- Lógica de validação
mkValidator :: ContractParams -> Cadastro -> () -> ScriptContext -> Bool
mkValidator params cadastro () ctx = 
  traceIfFalse "CPF inválido" (validateCPF $ cCPF cadastro) &&
  traceIfFalse "Sem selo" (checkSelo $ cSelo cadastro) &&
  traceIfFalse "Assinatura do admin necessária" (txSignedBy (scriptContextTxInfo ctx) (admin params))
  where
    checkSelo :: TokenName -> Bool
    checkSelo selo = selo == "FitaVermelha"

-- Compilação do validador
validator :: ContractParams -> Validator
validator params = mkValidatorScript $$(PlutusTx.compile [|| mkValidator ||])
  `applyCode`
  PlutusTx.liftCode params
