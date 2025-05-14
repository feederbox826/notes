> [!NOTE]
> This is a mirror of the [discourse post](https://discourse.stashapp.cc/t/1407)

*Boobs, how hard could they be?*

# tl;dr
- Cup sizes are wildly variable and metric cannot be directly converted to imperial
- Double Letters (DD/EE/FF) aren't always one size up
- US/UK/ITA: +1 size = +1in (2.54cm)
- AUS/EU/FRA/JP: +1 size = +1 cm (0.393in)

| Cup Size (in) | US | UK | Italy | Australia† | EU/FRA† | Japan† |
|---|---|---|---|---|---|---|
| 0 | AA | AA | - | AA | AA | A |
| 1 | A | A | A | A | A | B |
| 2 | B | B | B | B | B | C |
| 3 | C | C | C | C | C | D |
| 4 | D | D | D | D | D | E |
| 5 | DD/E | DD | DD | DD | E | F |
| 6 | DDD/F | E | E | E | F | G |
| 7 | G | F | F | F | G | H |
| 8 | H | FF | FF | G | H | I |
| 9 | I | G | G | H | I | J |
| 10 | J | GG | GG | I | J | K |
| 11 | K | H | H | J | K | L |
| 12 | L | HH | HH | K | L | M |

†: JP, EU, and AUS cup sizes increase by 2cm instead of 1 inch (2.54cm). At cup size M, this accounts for ≈ 6.5cm / 2.5in of difference. There is no common conversion metric.

# Background and definitions
Bra sizes are notoriously inconsistent not only how they are represented by stores in differing measurements for the same "cup size" but also differ in the actresses as time goes on. So here are some ground rules and baselines in order to keep this sensible

- Will mostly focus on cup sizes, as band sizing is another rabbit hole
- Given that StashDB follows the US standard, this will focus on the US cup size being the goal of normalization and the "objective truth"
- For example's sake we will use the [Bust/Waist/Hip measurements](https://en.wikipedia.org/wiki/Bust/waist/hip_measurements) measurements of 36-24-36in and a bra size of 34B (US). This would correspond to a StashDB/ "Full Measurement" of 34B-24-36. This is taken in the context of American bra sizes, as this can differ by country.
- Brands will be excluded in their entirety, they offer too much confusion in how they handle sister sizes and fittings.
- Underbust: Circumference of the ribcage under breasts
  - a.k.a "Band Size"
  - In the example, 34in
  - **not** the "Bust" measurement
- Overbust
  - Circumference over the breasts, at the bust
  - Corresponds to "Bust" only in B/W/H measurements
  - In the example, 36in
- Cup Size
  - A rough representation of the bust-to-band difference
  - A single letter increase does not always correspond to 1 inch


# Localization/ Country differences

## Fake Sizes (Double/Triple)
Before we get into localized cup sizes and metric vs imperial measurements, there remains the issue of "Fake" breast sizes, notably [double and triple letter cup sizes](https://www.boobpedia.com/boobs/Category:By_cup_size). Not all double and triple sizes are incorrect, but not all of them are correct.
The convention largely is that double letters are listed as the next higher cup size (DD = E) and triple letters are listed as two cup sizs higher (DDD). This convention applies to all letters greater than A and most commonly with D.
Multiple letters of A indicate an even smaller size, with AA being a step down from A, and AAA theoretically being a step down from AA.

In the US standard, there are no Quadruple sizes and only D has double/triple letters. EE/FF/GG can cause conflicts and size ambiguity when the locale is not specified. This is also reflected in Boobpedia in their definition of ["standard bra sizes"](https://www.boobpedia.com/boobs/Category:Bra_size)

## Localization
- JP, EU, and AUS cup sizes are actually measured very differently, From [BustyResources](https://bustyresources.fandom.com/wiki/Bra_sizing_by_country): "Cups increase by 2 centimeters for every band size, instead of the one inch (2.54 centimeters)". This causes more and more drift the higher in cup size you go. There is no common conversion method.
- UK, ITA, and AUS only follow the double letter standards for AA being a size down from A, Double letters increase in size without an equivalent (eg `D` < `DD` < `E`)
- Italy's `AA` cup is disputed in origin, some sites have it for compatibility, some don't

| Cup Size (in) | US | UK | Italy | Australia† | EU/FRA† | Japan† |
|---|---|---|---|---|---|---|
| 0 | AA | AA | - | AA | AA | A |
| 1 | A | A | A | A | A | B |
| 2 | B | B | B | B | B | C |
| 3 | C | C | C | C | C | D |
| 4 | D | D | D | D | D | E |
| 5 | DD/E | DD | DD | DD | E | F |
| 6 | DDD/F | E | E | E | F | G |
| 7 | G | F | F | F | G | H |
| 8 | H | FF | FF | G | H | I |
| 9 | I | G | G | H | I | J |
| 10 | J | GG | GG | I | J | K |
| 11 | K | H | H | J | K | L |
| 12 | L | HH | HH | K | L | M |

# Sister Sizes
*TBA*

- [performerBodyCalculator/pull/2](https://github.com/stg-annon/performerBodyCalculator/pull/2) explains sister sizes and breast volume well



# Resources
## Cup conversion charts

Community Resouces
- [bustyresources.fandom.com](https://bustyresources.fandom.com/wiki/Bra_sizing_by_country): Most accurate, highly recommended
- [r/ABraThatFits](hhttps://www.reddit.com/r/ABraThatFits/wiki/sizing_systems/): Not as detailed, more specific as to brands

Misc Resouces
- [model-studios.com](https://model-studios.com/breast-size/): Metric measurements as well
- [thetokyofashionguide](https://thetokyofashionguide.com/learn-japanese-bra-sizes-chart/): Extensive size conversion chart 

Brands
- [Katherine Hamilton](https://katherinehamilton.com/pages/international-bra-size-chart)
- [Victoria's Secret](https://customercare.victoriassecret.com/s/article/2052)
- [Chez-Mademoiselle](https://www.chez-mademoiselle.com/en/content/27-lingerie-international-sizing-charts)
- [Wacoal Lingerie](https://www.wacoallingerie.com/row/en/size-guide/)
- [Tennis Warehouse Europe](https://www.tenniswarehouse-europe.com/LC/womensbrasizing.html)

## Previous rantings/ resouces about cup size
- [stg-annon/performerBodyCalculator/pull/2](https://github.com/stg-annon/performerBodyCalculator/pull/2)
- [feederbox826/plugins/pull/22](https://github.com/feederbox826/plugins/pull/22#issuecomment-2676131351)