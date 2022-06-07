// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  ethereum,
  JSONValue,
  TypedMap,
  Entity,
  Bytes,
  Address,
  BigInt
} from "@graphprotocol/graph-ts";

export class AaveOracleAbi extends ethereum.SmartContract {
  static bind(address: Address): AaveOracleAbi {
    return new AaveOracleAbi("AaveOracleAbi", address);
  }

  getAssetPrice(asset: Address): BigInt {
    let result = super.call(
      "getAssetPrice",
      "getAssetPrice(address):(uint256)",
      [ethereum.Value.fromAddress(asset)]
    );

    return result[0].toBigInt();
  }

  try_getAssetPrice(asset: Address): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "getAssetPrice",
      "getAssetPrice(address):(uint256)",
      [ethereum.Value.fromAddress(asset)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  BASE_CURRENCY_UNIT(): BigInt {
    let result = super.call(
      "BASE_CURRENCY_UNIT",
      "BASE_CURRENCY_UNIT():(uint256)",
      []
    );

    return result[0].toBigInt();
  }

  try_BASE_CURRENCY_UNIT(): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "BASE_CURRENCY_UNIT",
      "BASE_CURRENCY_UNIT():(uint256)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }
}
