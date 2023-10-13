% declare our node types
% array_deconstruction(_Id, _Idx, _Array) :- false.

type(X, number) :- number(X).
type(X, string) :- string(X).
type(X, array) :- is_list(X).
type(X, Out) :- value(X, Val), type(Val, Out).

% type_at(Line, X, Out) :- value_at(Line, X, Val), type(Val, Out).

value(Id, Out) :-
  str(Out, _, Id).
value(Id, Out) :-
  num(Out, _, Id).
value(Id, Out) :- 
  id_assign(Id, _, Parent),
  value(Parent, Out).
value(Name, Out) :-
  id_lookup(Name, _, Lhs),
  lhs(Lhs, Assign),
  rhs(Rhs, Assign),
  value(Rhs, Out).
value(Ctx, Out) :-
  array_node(Array, Ctx),
  array(Array, Out).
value(Ctx, Out) :-
  id_lookup(Name, _, Ctx),
  value(Name, Out).
value(Id, Out) :-
  array_deconstruction(Id, Idx, Array),
  index_of(Array, Idx, Out).
value(Ctx, keyword(Name)) :-
  keyword(Name, _, Ctx).
value(Ctx, object_literal(Out)) :-
  object_literal(Object, Ctx),
  findall(Entry, object_entry_value(Object, Entry), Out).
  

object_entry_value(Object, record_entry(Name, Value)) :-
  regular_record_entry(Entry, Object),
  key_expr(Key, Entry),
  value(Key, Name),
  value_expr(V, Entry),
  value(V, Value).

fn_name(Fn, Name) :-
  fn(Fn, _), name_expr(NameExpr, Fn), id_lookup(Name, NameExpr).

object_keys(Ctx, Keys) :-
  findall(X, object_key(Ctx, X), Keys).
object_key(Ctx, Out) :-
  regular_record_entry(Entry, Ctx), key_expr(Key, Entry), value(Key, Out).

array(Ctx, []) :- not(array_element(_, _, Ctx)).
array(Ctx, Out) :-
  array_element(Elem, 0, Ctx),
  value(Elem, SoFar),
  array(Ctx, 1, [SoFar], Out).
array(Ctx, Idx, SoFar, Out) :-
  array_element(Elem, Idx, Ctx),
  value(Elem, Val),
  append(SoFar, [Val], NewSoFar),
  array(Ctx, Idx + 1, NewSoFar, Out).
array(_, Idx, Out, Out) :- not(array_element(_, Idx, _)).

index_of(Array, Idx, Out) :-
  array_node(Ctx, Array),
  array_element(Elem, Idx, Ctx),
  value(Elem, Out).

