search(Phrase, Line, Column) :-
  keyword_record_entry(Phrase, Ctx, _),
  line_and_col(Ctx, Line, Column).
search(Phrase, Line, Column) :-
  id_assign(Phrase, Ctx, _),
  line_and_col(Ctx, Line, Column).
search(Phrase, Line, Column) :-
  id_lookup(Phrase, Ctx, _),
  line_and_col(Ctx, Line, Column).
search(Phrase, Line, Column) :-
  keyword(Phrase, Ctx, _),
  line_and_col(Ctx, Line, Column).
search(Phrase, Line, Column) :-
  this_assign(Phrase, Ctx, _),
  line_and_col(Ctx, Line, Column).
