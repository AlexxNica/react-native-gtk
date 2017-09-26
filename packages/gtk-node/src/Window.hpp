#ifndef WINDOW_H
#define WINDOW_H

#include <gtkmm.h>
#include <string>
#include <memory>
#include "nbind/api.h"
#include "./Container.hpp"

class Window : public Container {
private:
  Gtk::Window widget;
  std::shared_ptr<nbind::cbFunction> on_close_cb;

public:
  Window();
  Gtk::Window* get_widget();
  void set_title(std::string title);
  void set_default_size(int width, int height);
  void on_close(nbind::cbFunction &cb);
  void show_all();
};

#endif
