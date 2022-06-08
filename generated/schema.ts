// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  TypedMap,
  Entity,
  Value,
  ValueKind,
  store,
  Bytes,
  BigInt,
  BigDecimal
} from "@graphprotocol/graph-ts";

export class DToken extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save DToken entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type DToken must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("DToken", id.toString(), this);
    }
  }

  static load(id: string): DToken | null {
    return changetype<DToken | null>(store.get("DToken", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get name(): string {
    let value = this.get("name");
    return value!.toString();
  }

  set name(value: string) {
    this.set("name", Value.fromString(value));
  }

  get ownerTokenId(): Array<string> {
    let value = this.get("ownerTokenId");
    return value!.toStringArray();
  }

  set ownerTokenId(value: Array<string>) {
    this.set("ownerTokenId", Value.fromStringArray(value));
  }
}

export class OwnerTokenId extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save OwnerTokenId entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type OwnerTokenId must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("OwnerTokenId", id.toString(), this);
    }
  }

  static load(id: string): OwnerTokenId | null {
    return changetype<OwnerTokenId | null>(store.get("OwnerTokenId", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get owner(): Bytes {
    let value = this.get("owner");
    return value!.toBytes();
  }

  set owner(value: Bytes) {
    this.set("owner", Value.fromBytes(value));
  }

  get tokenId(): string {
    let value = this.get("tokenId");
    return value!.toString();
  }

  set tokenId(value: string) {
    this.set("tokenId", Value.fromString(value));
  }

  get token(): string {
    let value = this.get("token");
    return value!.toString();
  }

  set token(value: string) {
    this.set("token", Value.fromString(value));
  }

  get timestamp(): i32 {
    let value = this.get("timestamp");
    return value!.toI32();
  }

  set timestamp(value: i32) {
    this.set("timestamp", Value.fromI32(value));
  }
}

export class Vault extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Vault entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type Vault must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("Vault", id.toString(), this);
    }
  }

  static load(id: string): Vault | null {
    return changetype<Vault | null>(store.get("Vault", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get aavePool(): Bytes {
    let value = this.get("aavePool");
    return value!.toBytes();
  }

  set aavePool(value: Bytes) {
    this.set("aavePool", Value.fromBytes(value));
  }

  get aaveOracle(): Bytes {
    let value = this.get("aaveOracle");
    return value!.toBytes();
  }

  set aaveOracle(value: Bytes) {
    this.set("aaveOracle", Value.fromBytes(value));
  }
}

export class BToken extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save BToken entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type BToken must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("BToken", id.toString(), this);
    }
  }

  static load(id: string): BToken | null {
    return changetype<BToken | null>(store.get("BToken", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get bToken(): Bytes {
    let value = this.get("bToken");
    return value!.toBytes();
  }

  set bToken(value: Bytes) {
    this.set("bToken", Value.fromBytes(value));
  }

  get bTokenSymbol(): string {
    let value = this.get("bTokenSymbol");
    return value!.toString();
  }

  set bTokenSymbol(value: string) {
    this.set("bTokenSymbol", Value.fromString(value));
  }

  get market(): Bytes {
    let value = this.get("market");
    return value!.toBytes();
  }

  set market(value: Bytes) {
    this.set("market", Value.fromBytes(value));
  }

  get marketSymbol(): string {
    let value = this.get("marketSymbol");
    return value!.toString();
  }

  set marketSymbol(value: string) {
    this.set("marketSymbol", Value.fromString(value));
  }

  get bTokenPrice(): BigDecimal {
    let value = this.get("bTokenPrice");
    return value!.toBigDecimal();
  }

  set bTokenPrice(value: BigDecimal) {
    this.set("bTokenPrice", Value.fromBigDecimal(value));
  }

  get collateralFactor(): BigDecimal {
    let value = this.get("collateralFactor");
    return value!.toBigDecimal();
  }

  set collateralFactor(value: BigDecimal) {
    this.set("collateralFactor", Value.fromBigDecimal(value));
  }

  get test1(): string {
    let value = this.get("test1");
    return value!.toString();
  }

  set test1(value: string) {
    this.set("test1", Value.fromString(value));
  }

  get test2(): string {
    let value = this.get("test2");
    return value!.toString();
  }

  set test2(value: string) {
    this.set("test2", Value.fromString(value));
  }

  get pool(): string {
    let value = this.get("pool");
    return value!.toString();
  }

  set pool(value: string) {
    this.set("pool", Value.fromString(value));
  }
}

export class Symbol extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Symbol entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type Symbol must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("Symbol", id.toString(), this);
    }
  }

  static load(id: string): Symbol | null {
    return changetype<Symbol | null>(store.get("Symbol", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get category(): string {
    let value = this.get("category");
    return value!.toString();
  }

  set category(value: string) {
    this.set("category", Value.fromString(value));
  }

  get symbol(): string {
    let value = this.get("symbol");
    return value!.toString();
  }

  set symbol(value: string) {
    this.set("symbol", Value.fromString(value));
  }

  get symbolAddress(): Bytes {
    let value = this.get("symbolAddress");
    return value!.toBytes();
  }

  set symbolAddress(value: Bytes) {
    this.set("symbolAddress", Value.fromBytes(value));
  }

  get manager(): Bytes {
    let value = this.get("manager");
    return value!.toBytes();
  }

  set manager(value: Bytes) {
    this.set("manager", Value.fromBytes(value));
  }

  get oracleManager(): Bytes {
    let value = this.get("oracleManager");
    return value!.toBytes();
  }

  set oracleManager(value: Bytes) {
    this.set("oracleManager", Value.fromBytes(value));
  }

  get symbolId(): Bytes {
    let value = this.get("symbolId");
    return value!.toBytes();
  }

  set symbolId(value: Bytes) {
    this.set("symbolId", Value.fromBytes(value));
  }

  get feeRatio(): BigInt {
    let value = this.get("feeRatio");
    return value!.toBigInt();
  }

  set feeRatio(value: BigInt) {
    this.set("feeRatio", Value.fromBigInt(value));
  }

  get alpha(): BigInt {
    let value = this.get("alpha");
    return value!.toBigInt();
  }

  set alpha(value: BigInt) {
    this.set("alpha", Value.fromBigInt(value));
  }

  get fundingPeriod(): BigInt {
    let value = this.get("fundingPeriod");
    return value!.toBigInt();
  }

  set fundingPeriod(value: BigInt) {
    this.set("fundingPeriod", Value.fromBigInt(value));
  }

  get minTradeVolume(): BigInt {
    let value = this.get("minTradeVolume");
    return value!.toBigInt();
  }

  set minTradeVolume(value: BigInt) {
    this.set("minTradeVolume", Value.fromBigInt(value));
  }

  get minInitialMarginRatio(): BigInt {
    let value = this.get("minInitialMarginRatio");
    return value!.toBigInt();
  }

  set minInitialMarginRatio(value: BigInt) {
    this.set("minInitialMarginRatio", Value.fromBigInt(value));
  }

  get initialMarginRatio(): BigInt {
    let value = this.get("initialMarginRatio");
    return value!.toBigInt();
  }

  set initialMarginRatio(value: BigInt) {
    this.set("initialMarginRatio", Value.fromBigInt(value));
  }

  get maintenanceMarginRatio(): BigInt {
    let value = this.get("maintenanceMarginRatio");
    return value!.toBigInt();
  }

  set maintenanceMarginRatio(value: BigInt) {
    this.set("maintenanceMarginRatio", Value.fromBigInt(value));
  }

  get pricePercentThreshold(): BigInt {
    let value = this.get("pricePercentThreshold");
    return value!.toBigInt();
  }

  set pricePercentThreshold(value: BigInt) {
    this.set("pricePercentThreshold", Value.fromBigInt(value));
  }

  get timeThreshold(): BigInt {
    let value = this.get("timeThreshold");
    return value!.toBigInt();
  }

  set timeThreshold(value: BigInt) {
    this.set("timeThreshold", Value.fromBigInt(value));
  }

  get isCloseOnly(): boolean {
    let value = this.get("isCloseOnly");
    return value!.toBoolean();
  }

  set isCloseOnly(value: boolean) {
    this.set("isCloseOnly", Value.fromBoolean(value));
  }

  get priceId(): Bytes {
    let value = this.get("priceId");
    return value!.toBytes();
  }

  set priceId(value: Bytes) {
    this.set("priceId", Value.fromBytes(value));
  }

  get volatilityId(): Bytes {
    let value = this.get("volatilityId");
    return value!.toBytes();
  }

  set volatilityId(value: Bytes) {
    this.set("volatilityId", Value.fromBytes(value));
  }

  get feeRatioITM(): BigInt {
    let value = this.get("feeRatioITM");
    return value!.toBigInt();
  }

  set feeRatioITM(value: BigInt) {
    this.set("feeRatioITM", Value.fromBigInt(value));
  }

  get feeRatioOTM(): BigInt {
    let value = this.get("feeRatioOTM");
    return value!.toBigInt();
  }

  set feeRatioOTM(value: BigInt) {
    this.set("feeRatioOTM", Value.fromBigInt(value));
  }

  get strikePrice(): BigInt {
    let value = this.get("strikePrice");
    return value!.toBigInt();
  }

  set strikePrice(value: BigInt) {
    this.set("strikePrice", Value.fromBigInt(value));
  }

  get isCall(): boolean {
    let value = this.get("isCall");
    return value!.toBoolean();
  }

  set isCall(value: boolean) {
    this.set("isCall", Value.fromBoolean(value));
  }

  get netVolume(): BigInt {
    let value = this.get("netVolume");
    return value!.toBigInt();
  }

  set netVolume(value: BigInt) {
    this.set("netVolume", Value.fromBigInt(value));
  }

  get netCost(): BigInt {
    let value = this.get("netCost");
    return value!.toBigInt();
  }

  set netCost(value: BigInt) {
    this.set("netCost", Value.fromBigInt(value));
  }

  get indexPrice(): BigInt {
    let value = this.get("indexPrice");
    return value!.toBigInt();
  }

  set indexPrice(value: BigInt) {
    this.set("indexPrice", Value.fromBigInt(value));
  }

  get fundingTimestamp(): BigInt {
    let value = this.get("fundingTimestamp");
    return value!.toBigInt();
  }

  set fundingTimestamp(value: BigInt) {
    this.set("fundingTimestamp", Value.fromBigInt(value));
  }

  get cumulativeFundingPerVolume(): BigInt {
    let value = this.get("cumulativeFundingPerVolume");
    return value!.toBigInt();
  }

  set cumulativeFundingPerVolume(value: BigInt) {
    this.set("cumulativeFundingPerVolume", Value.fromBigInt(value));
  }

  get tradersPnl(): BigInt {
    let value = this.get("tradersPnl");
    return value!.toBigInt();
  }

  set tradersPnl(value: BigInt) {
    this.set("tradersPnl", Value.fromBigInt(value));
  }

  get initialMarginRequired(): BigInt {
    let value = this.get("initialMarginRequired");
    return value!.toBigInt();
  }

  set initialMarginRequired(value: BigInt) {
    this.set("initialMarginRequired", Value.fromBigInt(value));
  }

  get nPositionHolders(): BigInt {
    let value = this.get("nPositionHolders");
    return value!.toBigInt();
  }

  set nPositionHolders(value: BigInt) {
    this.set("nPositionHolders", Value.fromBigInt(value));
  }

  get curIndexPrice(): BigInt {
    let value = this.get("curIndexPrice");
    return value!.toBigInt();
  }

  set curIndexPrice(value: BigInt) {
    this.set("curIndexPrice", Value.fromBigInt(value));
  }

  get curVolatility(): BigInt {
    let value = this.get("curVolatility");
    return value!.toBigInt();
  }

  set curVolatility(value: BigInt) {
    this.set("curVolatility", Value.fromBigInt(value));
  }

  get curCumulativeFundingPerVolume(): BigInt {
    let value = this.get("curCumulativeFundingPerVolume");
    return value!.toBigInt();
  }

  set curCumulativeFundingPerVolume(value: BigInt) {
    this.set("curCumulativeFundingPerVolume", Value.fromBigInt(value));
  }

  get K(): BigInt {
    let value = this.get("K");
    return value!.toBigInt();
  }

  set K(value: BigInt) {
    this.set("K", Value.fromBigInt(value));
  }

  get markPrice(): BigInt {
    let value = this.get("markPrice");
    return value!.toBigInt();
  }

  set markPrice(value: BigInt) {
    this.set("markPrice", Value.fromBigInt(value));
  }

  get funding(): BigInt {
    let value = this.get("funding");
    return value!.toBigInt();
  }

  set funding(value: BigInt) {
    this.set("funding", Value.fromBigInt(value));
  }

  get timeValue(): BigInt {
    let value = this.get("timeValue");
    return value!.toBigInt();
  }

  set timeValue(value: BigInt) {
    this.set("timeValue", Value.fromBigInt(value));
  }

  get delta(): BigInt {
    let value = this.get("delta");
    return value!.toBigInt();
  }

  set delta(value: BigInt) {
    this.set("delta", Value.fromBigInt(value));
  }

  get u(): BigInt {
    let value = this.get("u");
    return value!.toBigInt();
  }

  set u(value: BigInt) {
    this.set("u", Value.fromBigInt(value));
  }

  get power(): BigInt {
    let value = this.get("power");
    return value!.toBigInt();
  }

  set power(value: BigInt) {
    this.set("power", Value.fromBigInt(value));
  }

  get hT(): BigInt {
    let value = this.get("hT");
    return value!.toBigInt();
  }

  set hT(value: BigInt) {
    this.set("hT", Value.fromBigInt(value));
  }

  get powerPrice(): BigInt {
    let value = this.get("powerPrice");
    return value!.toBigInt();
  }

  set powerPrice(value: BigInt) {
    this.set("powerPrice", Value.fromBigInt(value));
  }

  get theoreticalPrice(): BigInt {
    let value = this.get("theoreticalPrice");
    return value!.toBigInt();
  }

  set theoreticalPrice(value: BigInt) {
    this.set("theoreticalPrice", Value.fromBigInt(value));
  }
}

export class LiquidityHistory extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save LiquidityHistory entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type LiquidityHistory must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("LiquidityHistory", id.toString(), this);
    }
  }

  static load(id: string): LiquidityHistory | null {
    return changetype<LiquidityHistory | null>(
      store.get("LiquidityHistory", id)
    );
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get pool(): string {
    let value = this.get("pool");
    return value!.toString();
  }

  set pool(value: string) {
    this.set("pool", Value.fromString(value));
  }

  get account(): Bytes {
    let value = this.get("account");
    return value!.toBytes();
  }

  set account(value: Bytes) {
    this.set("account", Value.fromBytes(value));
  }

  get bTokenAddress(): Bytes {
    let value = this.get("bTokenAddress");
    return value!.toBytes();
  }

  set bTokenAddress(value: Bytes) {
    this.set("bTokenAddress", Value.fromBytes(value));
  }

  get bToken(): string {
    let value = this.get("bToken");
    return value!.toString();
  }

  set bToken(value: string) {
    this.set("bToken", Value.fromString(value));
  }

  get lTokenId(): BigInt {
    let value = this.get("lTokenId");
    return value!.toBigInt();
  }

  set lTokenId(value: BigInt) {
    this.set("lTokenId", Value.fromBigInt(value));
  }

  get amount(): BigInt {
    let value = this.get("amount");
    return value!.toBigInt();
  }

  set amount(value: BigInt) {
    this.set("amount", Value.fromBigInt(value));
  }

  get newLiquidity(): BigInt {
    let value = this.get("newLiquidity");
    return value!.toBigInt();
  }

  set newLiquidity(value: BigInt) {
    this.set("newLiquidity", Value.fromBigInt(value));
  }

  get timestamp(): i32 {
    let value = this.get("timestamp");
    return value!.toI32();
  }

  set timestamp(value: i32) {
    this.set("timestamp", Value.fromI32(value));
  }
}

export class Liquidity extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Liquidity entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type Liquidity must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("Liquidity", id.toString(), this);
    }
  }

  static load(id: string): Liquidity | null {
    return changetype<Liquidity | null>(store.get("Liquidity", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get pool(): string {
    let value = this.get("pool");
    return value!.toString();
  }

  set pool(value: string) {
    this.set("pool", Value.fromString(value));
  }

  get poolAccount(): string {
    let value = this.get("poolAccount");
    return value!.toString();
  }

  set poolAccount(value: string) {
    this.set("poolAccount", Value.fromString(value));
  }

  get bTokenAddress(): Bytes {
    let value = this.get("bTokenAddress");
    return value!.toBytes();
  }

  set bTokenAddress(value: Bytes) {
    this.set("bTokenAddress", Value.fromBytes(value));
  }

  get bToken(): string {
    let value = this.get("bToken");
    return value!.toString();
  }

  set bToken(value: string) {
    this.set("bToken", Value.fromString(value));
  }

  get lTokenId(): BigInt {
    let value = this.get("lTokenId");
    return value!.toBigInt();
  }

  set lTokenId(value: BigInt) {
    this.set("lTokenId", Value.fromBigInt(value));
  }

  get liquidity(): BigInt {
    let value = this.get("liquidity");
    return value!.toBigInt();
  }

  set liquidity(value: BigInt) {
    this.set("liquidity", Value.fromBigInt(value));
  }

  get timestamp(): i32 {
    let value = this.get("timestamp");
    return value!.toI32();
  }

  set timestamp(value: i32) {
    this.set("timestamp", Value.fromI32(value));
  }
}

export class MarginHistory extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save MarginHistory entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type MarginHistory must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("MarginHistory", id.toString(), this);
    }
  }

  static load(id: string): MarginHistory | null {
    return changetype<MarginHistory | null>(store.get("MarginHistory", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get pool(): string {
    let value = this.get("pool");
    return value!.toString();
  }

  set pool(value: string) {
    this.set("pool", Value.fromString(value));
  }

  get account(): Bytes {
    let value = this.get("account");
    return value!.toBytes();
  }

  set account(value: Bytes) {
    this.set("account", Value.fromBytes(value));
  }

  get bTokenAddress(): Bytes {
    let value = this.get("bTokenAddress");
    return value!.toBytes();
  }

  set bTokenAddress(value: Bytes) {
    this.set("bTokenAddress", Value.fromBytes(value));
  }

  get bToken(): string {
    let value = this.get("bToken");
    return value!.toString();
  }

  set bToken(value: string) {
    this.set("bToken", Value.fromString(value));
  }

  get pTokenId(): BigInt {
    let value = this.get("pTokenId");
    return value!.toBigInt();
  }

  set pTokenId(value: BigInt) {
    this.set("pTokenId", Value.fromBigInt(value));
  }

  get amount(): BigInt {
    let value = this.get("amount");
    return value!.toBigInt();
  }

  set amount(value: BigInt) {
    this.set("amount", Value.fromBigInt(value));
  }

  get newMargin(): BigInt {
    let value = this.get("newMargin");
    return value!.toBigInt();
  }

  set newMargin(value: BigInt) {
    this.set("newMargin", Value.fromBigInt(value));
  }

  get timestamp(): i32 {
    let value = this.get("timestamp");
    return value!.toI32();
  }

  set timestamp(value: i32) {
    this.set("timestamp", Value.fromI32(value));
  }
}

export class Margin extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Margin entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type Margin must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("Margin", id.toString(), this);
    }
  }

  static load(id: string): Margin | null {
    return changetype<Margin | null>(store.get("Margin", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get pool(): string {
    let value = this.get("pool");
    return value!.toString();
  }

  set pool(value: string) {
    this.set("pool", Value.fromString(value));
  }

  get poolAccount(): string {
    let value = this.get("poolAccount");
    return value!.toString();
  }

  set poolAccount(value: string) {
    this.set("poolAccount", Value.fromString(value));
  }

  get bTokenAddress(): Bytes {
    let value = this.get("bTokenAddress");
    return value!.toBytes();
  }

  set bTokenAddress(value: Bytes) {
    this.set("bTokenAddress", Value.fromBytes(value));
  }

  get bToken(): string {
    let value = this.get("bToken");
    return value!.toString();
  }

  set bToken(value: string) {
    this.set("bToken", Value.fromString(value));
  }

  get pTokenId(): BigInt {
    let value = this.get("pTokenId");
    return value!.toBigInt();
  }

  set pTokenId(value: BigInt) {
    this.set("pTokenId", Value.fromBigInt(value));
  }

  get margin(): BigInt {
    let value = this.get("margin");
    return value!.toBigInt();
  }

  set margin(value: BigInt) {
    this.set("margin", Value.fromBigInt(value));
  }

  get timestamp(): i32 {
    let value = this.get("timestamp");
    return value!.toI32();
  }

  set timestamp(value: i32) {
    this.set("timestamp", Value.fromI32(value));
  }
}

export class TradeHistory extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save TradeHistory entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type TradeHistory must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("TradeHistory", id.toString(), this);
    }
  }

  static load(id: string): TradeHistory | null {
    return changetype<TradeHistory | null>(store.get("TradeHistory", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get pool(): string {
    let value = this.get("pool");
    return value!.toString();
  }

  set pool(value: string) {
    this.set("pool", Value.fromString(value));
  }

  get account(): Bytes {
    let value = this.get("account");
    return value!.toBytes();
  }

  set account(value: Bytes) {
    this.set("account", Value.fromBytes(value));
  }

  get symbol(): string {
    let value = this.get("symbol");
    return value!.toString();
  }

  set symbol(value: string) {
    this.set("symbol", Value.fromString(value));
  }

  get symbolId(): Bytes {
    let value = this.get("symbolId");
    return value!.toBytes();
  }

  set symbolId(value: Bytes) {
    this.set("symbolId", Value.fromBytes(value));
  }

  get pTokenId(): BigInt {
    let value = this.get("pTokenId");
    return value!.toBigInt();
  }

  set pTokenId(value: BigInt) {
    this.set("pTokenId", Value.fromBigInt(value));
  }

  get indexPrice(): BigInt {
    let value = this.get("indexPrice");
    return value!.toBigInt();
  }

  set indexPrice(value: BigInt) {
    this.set("indexPrice", Value.fromBigInt(value));
  }

  get tradeVolume(): BigInt {
    let value = this.get("tradeVolume");
    return value!.toBigInt();
  }

  set tradeVolume(value: BigInt) {
    this.set("tradeVolume", Value.fromBigInt(value));
  }

  get tradeCost(): BigInt {
    let value = this.get("tradeCost");
    return value!.toBigInt();
  }

  set tradeCost(value: BigInt) {
    this.set("tradeCost", Value.fromBigInt(value));
  }

  get tradeFee(): BigInt {
    let value = this.get("tradeFee");
    return value!.toBigInt();
  }

  set tradeFee(value: BigInt) {
    this.set("tradeFee", Value.fromBigInt(value));
  }

  get timestamp(): i32 {
    let value = this.get("timestamp");
    return value!.toI32();
  }

  set timestamp(value: i32) {
    this.set("timestamp", Value.fromI32(value));
  }
}

export class Position extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Position entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type Position must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("Position", id.toString(), this);
    }
  }

  static load(id: string): Position | null {
    return changetype<Position | null>(store.get("Position", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get pool(): string {
    let value = this.get("pool");
    return value!.toString();
  }

  set pool(value: string) {
    this.set("pool", Value.fromString(value));
  }

  get poolAccount(): string {
    let value = this.get("poolAccount");
    return value!.toString();
  }

  set poolAccount(value: string) {
    this.set("poolAccount", Value.fromString(value));
  }

  get symbol(): string {
    let value = this.get("symbol");
    return value!.toString();
  }

  set symbol(value: string) {
    this.set("symbol", Value.fromString(value));
  }

  get symbolId(): Bytes {
    let value = this.get("symbolId");
    return value!.toBytes();
  }

  set symbolId(value: Bytes) {
    this.set("symbolId", Value.fromBytes(value));
  }

  get pTokenId(): BigInt {
    let value = this.get("pTokenId");
    return value!.toBigInt();
  }

  set pTokenId(value: BigInt) {
    this.set("pTokenId", Value.fromBigInt(value));
  }

  get volume(): BigInt {
    let value = this.get("volume");
    return value!.toBigInt();
  }

  set volume(value: BigInt) {
    this.set("volume", Value.fromBigInt(value));
  }

  get timestamp(): i32 {
    let value = this.get("timestamp");
    return value!.toI32();
  }

  set timestamp(value: i32) {
    this.set("timestamp", Value.fromI32(value));
  }
}

export class Pool extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Pool entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type Pool must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("Pool", id.toString(), this);
    }
  }

  static load(id: string): Pool | null {
    return changetype<Pool | null>(store.get("Pool", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get admin(): Bytes {
    let value = this.get("admin");
    return value!.toBytes();
  }

  set admin(value: Bytes) {
    this.set("admin", Value.fromBytes(value));
  }

  get implementation(): Bytes {
    let value = this.get("implementation");
    return value!.toBytes();
  }

  set implementation(value: Bytes) {
    this.set("implementation", Value.fromBytes(value));
  }

  get pToken(): string {
    let value = this.get("pToken");
    return value!.toString();
  }

  set pToken(value: string) {
    this.set("pToken", Value.fromString(value));
  }

  get lToken(): string {
    let value = this.get("lToken");
    return value!.toString();
  }

  set lToken(value: string) {
    this.set("lToken", Value.fromString(value));
  }

  get symbolManager(): string {
    let value = this.get("symbolManager");
    return value!.toString();
  }

  set symbolManager(value: string) {
    this.set("symbolManager", Value.fromString(value));
  }

  get swapper(): Bytes {
    let value = this.get("swapper");
    return value!.toBytes();
  }

  set swapper(value: Bytes) {
    this.set("swapper", Value.fromBytes(value));
  }

  get tokenB0(): Bytes {
    let value = this.get("tokenB0");
    return value!.toBytes();
  }

  set tokenB0(value: Bytes) {
    this.set("tokenB0", Value.fromBytes(value));
  }

  get tokenWETH(): Bytes {
    let value = this.get("tokenWETH");
    return value!.toBytes();
  }

  set tokenWETH(value: Bytes) {
    this.set("tokenWETH", Value.fromBytes(value));
  }

  get marketB0(): Bytes {
    let value = this.get("marketB0");
    return value!.toBytes();
  }

  set marketB0(value: Bytes) {
    this.set("marketB0", Value.fromBytes(value));
  }

  get marketWETH(): Bytes {
    let value = this.get("marketWETH");
    return value!.toBytes();
  }

  set marketWETH(value: Bytes) {
    this.set("marketWETH", Value.fromBytes(value));
  }

  get vaultImplementation(): Bytes {
    let value = this.get("vaultImplementation");
    return value!.toBytes();
  }

  set vaultImplementation(value: Bytes) {
    this.set("vaultImplementation", Value.fromBytes(value));
  }

  get protocolFeeCollector(): Bytes {
    let value = this.get("protocolFeeCollector");
    return value!.toBytes();
  }

  set protocolFeeCollector(value: Bytes) {
    this.set("protocolFeeCollector", Value.fromBytes(value));
  }

  get bTokens(): Array<string> {
    let value = this.get("bTokens");
    return value!.toStringArray();
  }

  set bTokens(value: Array<string>) {
    this.set("bTokens", Value.fromStringArray(value));
  }

  get poolLiquidity(): BigDecimal {
    let value = this.get("poolLiquidity");
    return value!.toBigDecimal();
  }

  set poolLiquidity(value: BigDecimal) {
    this.set("poolLiquidity", Value.fromBigDecimal(value));
  }

  get margin(): Array<string> {
    let value = this.get("margin");
    return value!.toStringArray();
  }

  set margin(value: Array<string>) {
    this.set("margin", Value.fromStringArray(value));
  }

  get position(): Array<string> {
    let value = this.get("position");
    return value!.toStringArray();
  }

  set position(value: Array<string>) {
    this.set("position", Value.fromStringArray(value));
  }

  get liquidity(): Array<string> {
    let value = this.get("liquidity");
    return value!.toStringArray();
  }

  set liquidity(value: Array<string>) {
    this.set("liquidity", Value.fromStringArray(value));
  }

  get liquidityHistory(): Array<string> {
    let value = this.get("liquidityHistory");
    return value!.toStringArray();
  }

  set liquidityHistory(value: Array<string>) {
    this.set("liquidityHistory", Value.fromStringArray(value));
  }

  get marginHistory(): Array<string> {
    let value = this.get("marginHistory");
    return value!.toStringArray();
  }

  set marginHistory(value: Array<string>) {
    this.set("marginHistory", Value.fromStringArray(value));
  }

  get tradeHistory(): Array<string> {
    let value = this.get("tradeHistory");
    return value!.toStringArray();
  }

  set tradeHistory(value: Array<string>) {
    this.set("tradeHistory", Value.fromStringArray(value));
  }
}

export class SymbolManager extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save SymbolManager entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type SymbolManager must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("SymbolManager", id.toString(), this);
    }
  }

  static load(id: string): SymbolManager | null {
    return changetype<SymbolManager | null>(store.get("SymbolManager", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get pool(): string {
    let value = this.get("pool");
    return value!.toString();
  }

  set pool(value: string) {
    this.set("pool", Value.fromString(value));
  }
}

export class PoolAccount extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save PoolAccount entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type PoolAccount must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("PoolAccount", id.toString(), this);
    }
  }

  static load(id: string): PoolAccount | null {
    return changetype<PoolAccount | null>(store.get("PoolAccount", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get account(): string {
    let value = this.get("account");
    return value!.toString();
  }

  set account(value: string) {
    this.set("account", Value.fromString(value));
  }

  get pool(): string {
    let value = this.get("pool");
    return value!.toString();
  }

  set pool(value: string) {
    this.set("pool", Value.fromString(value));
  }

  get pTokenId(): BigInt {
    let value = this.get("pTokenId");
    return value!.toBigInt();
  }

  set pTokenId(value: BigInt) {
    this.set("pTokenId", Value.fromBigInt(value));
  }

  get lTokenId(): BigInt {
    let value = this.get("lTokenId");
    return value!.toBigInt();
  }

  set lTokenId(value: BigInt) {
    this.set("lTokenId", Value.fromBigInt(value));
  }

  get positions(): Array<string> {
    let value = this.get("positions");
    return value!.toStringArray();
  }

  set positions(value: Array<string>) {
    this.set("positions", Value.fromStringArray(value));
  }

  get liquidities(): Array<string> {
    let value = this.get("liquidities");
    return value!.toStringArray();
  }

  set liquidities(value: Array<string>) {
    this.set("liquidities", Value.fromStringArray(value));
  }

  get margins(): Array<string> {
    let value = this.get("margins");
    return value!.toStringArray();
  }

  set margins(value: Array<string>) {
    this.set("margins", Value.fromStringArray(value));
  }
}

export class Account extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Account entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type Account must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("Account", id.toString(), this);
    }
  }

  static load(id: string): Account | null {
    return changetype<Account | null>(store.get("Account", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get pools(): Array<string> {
    let value = this.get("pools");
    return value!.toStringArray();
  }

  set pools(value: Array<string>) {
    this.set("pools", Value.fromStringArray(value));
  }
}
