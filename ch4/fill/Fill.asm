@index
M=0

(LOOP)
  @KBD
  D=M

	@FILL
	D;JGT

  @index
  D=M

  @LOOP
  D;JEQ

  // 키보드 안누르고 있으면서 idenx가 0보다 클 때

  @index
  M=M-1

  @SCREEN
  D=A

  @index
  D=D+M

  A=D
  M=0


  @LOOP
  0;JMP

  (FILL)

  @SCREEN
  D=A

  @index
  D=D+M

  A=D
  M=-1

  @index
  M=M+1

  @LOOP
  0;JMP

(END)
	@END
	0;JMP // 무한루프