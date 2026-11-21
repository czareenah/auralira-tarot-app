/** Metadata only. Deck contents and session behavior belong to later features. */
export type TarotSuit = 'wands' | 'cups' | 'swords' | 'pentacles';

export type TarotCard = {
  readonly id: string;
  readonly name: string;
} & (
  | { readonly arcana: 'major'; readonly number: number }
  | { readonly arcana: 'minor'; readonly suit: TarotSuit; readonly rank: number }
);
