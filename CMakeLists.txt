cmake_minimum_required(VERSION 3.16)

if(NOT DEFINED CMAKE_TOOLCHAIN_FILE)
  if(DEFINED ENV{VITASDK})
    set(CMAKE_TOOLCHAIN_FILE "$ENV{VITASDK}/share/vita.toolchain.cmake" CACHE PATH "toolchain file")
  else()
    message(FATAL_ERROR "Please define VITASDK to point to your SDK path!")
  endif()
endif()

include("$ENV{VITASDK}/share/vita.cmake" REQUIRED)

set(VITA_MKSFOEX_FLAGS "${VITA_MKSFOEX_FLAGS} -d PARENTAL_LEVEL=1")

project(assimptest-vita)

find_package(SDL2 REQUIRED)

include_directories(
    "src"
)

include_directories(
    "src/test"
)

set(ELFNAME "assimptest")


file(GLOB SOURCES src/*.cpp)

  set(ELF "${ELFNAME}.elf")
  set(SELF "${ELFNAME}.self")

  add_executable("${ELF}"
    ${SOURCES}
  )

  target_link_libraries("${ELF}" SDL2_image SDL2::SDL2 assimp png jpeg webp z pthread SceIme_stub libGLESv2_stub libIMGEGL_stub)

  VITA_create_self("${SELF}"
    "${ELF}"
    UNSAFE
    UNCOMPRESSED
    NOASLR
  )

  # Build VPK

  set(VPK "${ELFNAME}.vpk")
  set(TITLE_NAME "${ELFNAME}")
  set(TITLE_ID "ASS999999")
  set(TITLE_VER "01.00")

  VITA_create_vpk("${VPK}" "${TITLE_ID}" "${SELF}"
    NAME "${TITLE_NAME}"
    VERSION "${TITLE_VER}"
    FILE sce_sys sce_sys
    FILE module module
    FILE models models
    FILE shaders shaders
  )
